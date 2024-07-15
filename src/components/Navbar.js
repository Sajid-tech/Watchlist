import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';

function Navbar() {
    const { currentUser, logout } = useAuth();

    return (
        <nav className="navbar">
            <h1>Movie Watchlist</h1>
            {currentUser && (
                <ul>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/watchlist">Watchlist</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;