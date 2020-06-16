import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom'

export default function NoForm() {
    return (
        <div className="Container">
            <h1>Notion Forms</h1>
            <p>The form you're looking for wasn't found. If you are the owner of this form, check your forms database or contact us at notionforms@gmail.com to troubleshoot.</p>
            <p><Link to='/'>Back to home</Link></p>
        </div>
    );
}