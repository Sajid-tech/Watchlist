import React, { useState } from 'react';
import { useAuth } from '../auth';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email);
        navigate('/search');
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
    );
}

export default Signup;