import os
import hashlib
from flask import Flask, request, jsonify, send_from_directory
from pymongo import MongoClient
from bson.objectid import ObjectId
from notion.client import NotionClient
from collections import OrderedDict

app = Flask(__name__, static_folder='frontend/build')

FORM_KEYS = ['form_heading','user','pass']

mongoAuth = os.getenv('MONGO_USER_PASS')
mongoClient = MongoClient(f'mongodb+srv://{mongoAuth}@notion-forms-ycc2d.mongodb.net/notion-forms?retryWrites=true&w=majority')
db = mongoClient['notion-forms']
tokens = db.tokens
mongoForms = db.forms

def _get_form_by_id(form_id: str):
    form = mongoForms.find_one(ObjectId(form_id))
    token = tokens.find_one({'user':form['user']})

    result = {
        'id':str(form['_id']),
        'token':token['token'],
        'forms_db':token['forms_db'],
        'fields_db':token['fields_db'],
    }
    return result

def _get_form_for_display(form, form_results):
    form_result = {}
    for row in form_results:
        all_properties = row.get_all_properties()
        if all_properties['form_link'].endswith(form['id']):
            form_result=all_properties
            break
    
    return form_result

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/test', methods=['GET'])
def test():
    print("test")
    return "test", 200
    
@app.route('/api/getForm/<form_id>', methods=['GET'])
def get_form_by_id(form_id: str):
    return _get_form_by_id(form_id), 200
    
@app.route('/api/getFormForDisplay/<form_id>', methods=['GET']) 
def get_form_for_display_by_id(form_id: str):
    form_id = form_id[-24:]
    form = _get_form_by_id(form_id)

    notionClient = NotionClient(form['token'])
    forms = notionClient.get_collection_view(form['forms_db']).collection
    fields = notionClient.get_collection_view(form['fields_db']).collection

    form_result = _get_form_for_display(form, forms.query())    
    if form_result == {}:
        return 'form entry in form_db not found', 400
        
    formForDisplay = {
        'heading':form_result['heading'] if 'heading' in form_result and form_result['heading'] else '',
        'description':form_result['description'] if 'description' in form_result and form_result['description'] else '',
        'questions':[]
    }

    collection = notionClient.get_collection_view(form_result['notion_db']).collection
    propsAvailable = { p['name']:{'type':p['type']} for p in collection.get_schema_properties()}
    propsSelected = OrderedDict(map(lambda f: (f,None), form_result['fields']))

    for fieldBlock in propsSelected:
        field = fieldBlock.get_all_properties()

        if field['name'] in propsAvailable:

            result = {
                'field':field['name'],
                'question':field['question'] if 'question' in field and field['question'] else field['name'],
                'mandatory':field['mandatory'] if 'mandatory' in field and field['mandatory'] else False,
                'type':propsAvailable[field['name']]['type'],
            }

            if propsAvailable[field['name']]['type'] == 'select' or propsAvailable[field['name']]['type'] == 'multi_select':
                if 'options' in collection.get_schema_property(field['name']):
                    result['options'] = [o['value'] for o in collection.get_schema_property(field['name'])['options']]
                else:
                    result['options'] = []
                if propsAvailable[field['name']]['type'] == 'multi_select':
                    result['value']=[]

            formForDisplay['questions'].append(result)
    
    return formForDisplay, 200

@app.route('/api/submitToForm/<form_id>', methods=['POST']) 
def add_form_entry(form_id:str):
    data = request.get_json()

    form_id = form_id[-24:]
    form = _get_form_by_id(form_id)
    notionClient = NotionClient(form['token'])
    
    forms = notionClient.get_collection_view(form['forms_db']).collection
    fields = notionClient.get_collection_view(form['fields_db']).collection

    form_result = _get_form_for_display(form, forms.query())
    if form_result == {}:
        return 'form entry in form_db not found', 400

    collection = notionClient.get_collection_view(form_result['notion_db']).collection
    
    allMandatoryIncluded = True
    for prop in data:
        if prop['mandatory'] and not ('value' in prop and prop['value']) and (prop['type'] != 'checkbox'):
            allMandatoryIncluded = False

    if not allMandatoryIncluded:
        return 'not all mandatories included', 400

    row = collection.add_row()

    for prop in data:
        if 'value' in prop: 
            row.set_property(prop['field'], prop['value'])

    return "item added", 200
    

@app.route('/api/createForm', methods=['POST']) 
def add_form():
    data = request.get_json()

    for key in FORM_KEYS:
        if key not in data:
            return f"no ${key}", 400
    if 'notion_db' not in data:
            return f"no notion_db", 400
    
    user = tokens.find_one({'user':data['user']})
    
    if user == None:
        return "user not found", 401

    password = data['pass']
    key = hashlib.pbkdf2_hmac(
        'sha256', # The hash digest algorithm for HMAC
        password.encode('utf-8'), # Convert the password to bytes
        user['salt'], # Provide the salt
        100000 # It is recommended to use at least 100,000 iterations of SHA-256 
    )

    if user['pass'] != key:
        return "user pass not valid", 401

    form = { key: data[key] for key in FORM_KEYS }
    form.pop('pass', None)
    form.pop('form_heading', None)

    notionClient = NotionClient(user['token'])
    
    forms = notionClient.get_collection_view(user['forms_db']).collection
    fields = notionClient.get_collection_view(user['fields_db']).collection
    collection = notionClient.get_collection_view(data['notion_db']).collection

    form_row = forms.add_row()
    form_row.set_property('heading', data['form_heading'])
    form_row.set_property('notion_db', data['notion_db'])

    propsAvailable = collection.get_schema_properties()

    for p in propsAvailable:
        field_row = fields.add_row()    
        field_row.set_property('name', p['name'])
        field_row.set_property('form', form_row)

    created = mongoForms.insert_one(form)

    collection_row = collection.add_row()
    collection_row.set_property('title', "Connected successfully (you can delete this)")
    
    suffix = str(created.inserted_id)

    base = request.base_url.split( '/' )[2];

    form_row.set_property('form_link', f"{base}/form/{suffix}")

    return {'id':suffix}, 200

if __name__ == "__main__":
    app.run()