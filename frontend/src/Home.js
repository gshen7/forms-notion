import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="Container">
            <h1>Notion Forms</h1>
            <p><Link target="_blank" rel="noopener noreferrer" to='/form/5ee8e0606b5647fed80c522f'>Join the waitlist to start creating your own forms as soon as possible</Link></p>
            <p><Link to='/create'>Create a form (account required)</Link></p>
            <p><Link target="_blank" rel="noopener noreferrer" to='/form/5eed12b343af73792c5b0a10'>Let us know what you think of Notion Forms</Link></p>
            <p><Link to='/about'>About</Link></p>
        </div>
    );
}