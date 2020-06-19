import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './styles.css';
import { Button, TextField, LinearProgress } from "@material-ui/core";

export default function Create() {
    const [formHeading, setFormHeading] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
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

    const handleResponseDbInput = (value) => {
        setResponseDb(value)
        setCreateError("")
    }

    return (
        <div className="Container">
            <h1>Create Form</h1>
            <div>
                <p><Link target="_blank" rel="noopener noreferrer" to='/form/5ee8e0606b5647fed80c522f'>If you don't have an account, join the waitlist to start creating your own forms as soon as possible</Link></p>
                <p><Link target="_blank" rel="noopener noreferrer" to='/form/5eed12b343af73792c5b0a10'>Let us know if you're enjoying Notion Forms or how we can improve</Link></p>
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
                    onChange={e => handleResponseDbInput(e.target.value)}
                    value={responseDb}
                    label="* Link to Response DB"
                    variant="outlined"
                />
            </div>
            <br />
            <p>{createError}</p>
            <div>
                <Button
                    variant="contained"
                    color="default"
                    onClick={() => create(history)}
                >
                    <h2>{creating ? <div><LinearProgress /><p>creating...</p></div> : <div><LinearProgress variant="determinate" value={0} /><p>Create</p></div>}</h2>
                </Button>
            </div>
            
        </div>
    );
}