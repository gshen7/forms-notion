import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div className="Container">
            <h1>Notion Forms</h1>
            <p>With Notion Forms, you can create and manage forms that submit responses directly into your Notion databases. You will be able to manage your forms using your own Notion databases.</p>
            <p><Link to='/'>Back to home</Link></p>
        </div>
    );
}