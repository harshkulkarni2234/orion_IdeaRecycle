import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Recycle, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ isAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Explore', path: '/dashboard' },
        { name: 'How It Works', path: '/' },
        { name: 'Community', path: '/community' },
    ];

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <div className="nav-logo-icon">
                        <Recycle size={24} />
                    </div>
                    <span className="gradient-text" style={{ fontSize: '1.5rem' }}>IdeaRecycle</span>
                </Link>

                {/* Desktop Nav */}
                <div className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    {isAuthenticated ? (
                        <Link to="/profile" className="profile-btn" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--gradient-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 10px rgba(45, 212, 191, 0.3)'
                        }} title="View Profile">
                            {(localStorage.getItem('userName') || 'Alex Rivera').split(' ').map(n => n[0]).join('')}
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn-secondary-text">
                                Sign In
                            </Link>
                            <Link to="/submit" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0.5rem 0' }}></div>
                    <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
                        Sign In
                    </Link>
                    <Link to="/submit" className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setIsOpen(false)}>
                        Get Started
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
