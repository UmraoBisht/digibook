import React from 'react'
import { NavLink } from 'react-router-dom'
import './NotFound.css';

function NotFound() {
    return (
        <div id="error-page">
            <div className="content">
                <h2 className="header" data-text="404">
                    404
                </h2>
                <h4 data-text="Opps! Page not found">
                    Opps! Page not found
                </h4>
                <p>
                    Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                </p>
                <div className="btns">
                    <NavLink to='/'>return home</NavLink>
                    <NavLink to='contact'>report problem</NavLink>
                </div>
            </div>
        </div>
    )
}

export default NotFound