import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="Container">
            <h1>Notion Forms</h1>
            <p><Link target="_blank" to='/form/5ee7def32ba16778f4311a77'>Join the waitlist to start creating your own forms as soon as possible</Link></p>
            <p><Link to='/create'>Create a form (needs account)</Link></p>
            <p><Link to='/about'>About</Link></p>
        </div>
    );
}