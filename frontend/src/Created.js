import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom'

export default function Created(self) {
    let base = window.location.host
    const [formPath, setFormPath] = useState("");
    const [formsDb, setFormsDb] = useState("");
    const [fieldsDb, setFieldsDb] = useState("");
    const [responseDb, setResponseDb] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title = "Form Created"
        fetch(`/api/getForm/${self.location.state.form_id}`).then(res => res.json()).then(data => {
            setFormsDb(`${data.forms_db}`)
            setFieldsDb(`${data.fields_db}`)
            setResponseDb(`${self.location.state.notion_db}`)
            setFormPath(`/form/${self.location.state.form_id}`)
            setLoaded(true)
        });
    }, [self.location.state.form_id, self.location.state.notion_db]);

    return (
        <div className="Container">
            <h1>{loaded ? 'Your form has been created' : "Finishing up..."}</h1>
            {loaded ? <div>
                <p>Your form is live at: <Link target="_blank" to={formPath}>{base}{formPath}</Link></p>
                <p>Your form will send responses to: <a target="_blank" href={responseDb}>this notion collection</a></p>
                <p>You can edit your form using: <a target="_blank" href={formsDb}>your forms notion collection</a> and <a target="_blank" href={fieldsDb}>your fields notion collection</a></p>
                <p><Link to='/'>Back to home</Link></p>
            </div> : ""}
        </div>
    );
}