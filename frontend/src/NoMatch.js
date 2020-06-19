import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom'

export default function NoMatch() {
    return (
        <div className="Container">
            <h1>Notion Forms</h1>
            <p>The page you're looking for wasn't found.</p>
            <p><Link to='/'>Back to home</Link></p>
        </div>
    );
}