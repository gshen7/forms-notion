import React, { useEffect }from 'react';
import './styles.css';
import { Link } from 'react-router-dom'


export default function Submitted(self) {
    useEffect(() => {
        document.title = "Response Submitted"
    }, []);

    let formPath = `/form/${self.location.state.form_id}`
    return (
        <div className="Container">
            <h1>Your response has been recorded.</h1>
            <p><Link to={formPath}>Submit another response</Link></p>
        </div>
    );
}