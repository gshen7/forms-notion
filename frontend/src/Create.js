import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './styles.css';
import { Button, TextField } from "@material-ui/core";

export default function Create() {
    const [formHeading, setFormHeading] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [formsDb, setFormsDb] = useState("");
    const [fieldsDb, setFieldsDb] = useState("");
    const [responseDb, setResponseDb] = useState("");
    const [createError, setCreateError] = useState("");
    const [creating, setCreating] = useState(false);
    const history = useHistory()

    useEffect(() => {
        document.title = "Create Form"
    }, []);

    const create = (history) => {
        setCreating(true)
        setCreateError("")
        let body = {
            form_heading:formHeading,
            user:user,
            pass:pass,
            forms_db:formsDb,
            fields_db:fieldsDb,
            notion_db:responseDb
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        fetch(`/api/createForm`, options).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    history.push('/created', { form_id: data.id, notion_db: responseDb })
                })
            } else if (res.status === 401) {
                setCreating(false)
                setCreateError("Could not create form, username and password were not found. If you do not have a username and password, join the waitlist. Otherwise, try again or contact me if you're unable to use your account.")
            } else {
                setCreating(false)
                setCreateError("Could not create form, check that all fields are included and links to notion are valid.")
            }
        })
    };

    const handleFormHeadingInput = (value) => {
        setFormHeading(value)
        setCreateError("")
    }

    const handleUserInput = (value) => {
        setUser(value)
        setCreateError("")
    }

    const handlePassInput = (value) => {
        setPass(value)
        setCreateError("")
    }

    const handleFormsDbInput = (value) => {
        setFormsDb(value)
        setCreateError("")
    }

    const handleFieldsDbInput = (value) => {
        setFieldsDb(value)
        setCreateError("")
    }

    const handleResponseDbInput = (value) => {
        setResponseDb(value)
        setCreateError("")
    }

    return (
        <div className="Container">
            <h1>Create Form</h1>
            <div>
                <p><Link target="_blank" to='/form/5ee7def32ba16778f4311a77'>Join the waitlist to start creating your own forms as soon as possible</Link></p>
                <p><Link to='/'>Cancel and go back to home</Link></p>
            </div>
            <div>
                <TextField
                    fullWidth
                    margin="normal"
                    onChange={e => handleUserInput(e.target.value)}
                    value={user}
                    label="* Username"
                    variant="outlined"
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    margin="normal"
                    onChange={e => handlePassInput(e.target.value)}
                    value={pass}
                    label="* Password"
                    type="password"
                    variant="outlined"
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    margin="normal"
                    onChange={e => handleFormHeadingInput(e.target.value)}
                    value={formHeading}
                    label="* Form Heading"
                    variant="outlined"
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    margin="normal"
                    onChange={e => handleFormsDbInput(e.target.value)}
                    value={formsDb}
                    label="* Link to Forms DB"
                    variant="outlined"
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    margin="normal"
                    onChange={e => handleFieldsDbInput(e.target.value)}
                    value={fieldsDb}
                    label="* Link to Fields DB"
                    variant="outlined"
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    margin="normal"
                    onChange={e => handleResponseDbInput(e.target.value)}
                    value={responseDb}
                    label="* Link to Response DB"
                    variant="outlined"
                />
            </div>
            <br />
            <div>
                <Button
                    variant="contained"
                    color="default"
                    onClick={() => create(history)}
                >
                    <h2>{creating ? "Creating..." : "Create"}</h2>
                </Button>
                <p>{createError}</p>
            </div>
            
        </div>
    );
}