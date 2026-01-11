import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = ({ setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const name = data.get('name') || 'Alex Rivera';
        localStorage.setItem('userName', name);
        setIsAuthenticated(true);
        navigate('/dashboard');
    };

    return (
        <div className="auth-page container">
            <div className="blob blob-1" style={{ width: '300px', height: '300px' }}></div>
            <motion.div
                className="glass-card auth-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="auth-title">
                    {isLogin ? "Welcome Back" : "Join IdeaRecycle"}
                </h1>
                <p className="auth-subtitle">
                    {isLogin ? "Sign in to continue failing forward" : "Start turning failures into opportunities"}
                </p>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Sign In
                    </button>
                    <button
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" name="name" className="auth-input" placeholder="John Doe" required />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">{!isLogin ? "Personal Email" : "Email Address"}</label>
                        <input type="email" className="auth-input" placeholder="you@example.com" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="auth-input" placeholder="••••••••" required />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">University / College</label>
                            <input type="text" className="auth-input" placeholder="e.g. Stanford University" />
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary submit-btn">
                        {isLogin ? "Sign In" : "Create Account"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>By continuing, you agree to our Terms and our Philosophy of Open Innovation.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
