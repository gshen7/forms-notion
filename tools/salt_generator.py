import os
import hashlib
from pymongo import MongoClient

mongoAuth = os.getenv('MONGO_USER_PASS')
mongoClient = MongoClient("mongodb+srv://"+str(mongoAuth)+"@notion-forms-ycc2d.mongodb.net/notion-forms?retryWrites=true&w=majority")
db = mongoClient['notion-forms']
tokens = db.tokens

USER = 'nat.ngo'
password = 'notion-forms'

salt = os.urandom(32)
tokens.update_one({'user':USER},{'$set':{'salt':salt}})

key = hashlib.pbkdf2_hmac(
    'sha256', # The hash digest algorithm for HMAC
    password.encode('utf-8'), # Convert the password to bytes
    salt, # Provide the salt
    100000 # It is recommended to use at least 100,000 iterations of SHA-256 
)

tokens.update_one({'user':USER},{'$set':{'pass':key}})