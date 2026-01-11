import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, Lightbulb, TrendingUp, X, MessageSquare, Users, CreditCard, Lock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import './Dashboard.css';

const Profile = ({ setIsAuthenticated }) => {
    const [activeModal, setActiveModal] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/');
    };

    const user = {
        name: "Alex Rivera",
        age: 21,
        occupation: "Student",
        gender: "Male",
        email: "alex.rivera@cornell.edu", // Will simulate masking
        password: "password123", // Will simulate masking
        school: "Cornell University",
        stats: { submitted: 5, recycled: 12, contributions: 28 }
    };

    const getMaskedEmail = (email) => {
        const [local, domain] = email.split('@');
        return `${local.substring(0, 2)}****@${domain}`;
    };

    const mySubmittedIdeas = [
        { id: 101, title: "AR Study Notes", credits: 40, owner: "Alex Rivera", date: "Oct 2025" },
        { id: 102, title: "DormDash", credits: 40, owner: "Alex Rivera", date: "Nov 2025" },
        { id: 103, title: "EcoPrint", credits: 40, owner: "Alex Rivera", date: "Dec 2025" },
        { id: 104, title: "Roommate Matcher", credits: 40, owner: "Alex Rivera", date: "Jan 2026" },
        { id: 105, title: "Campus Events API", credits: 40, owner: "Alex Rivera", date: "Jan 2026" },
    ];

    const myFeedback = [
        { id: 1, type: "Market", count: 15, msg: "Target audience is too niche" },
        { id: 2, type: "Tech", count: 12, msg: "Backend latency issues" },
        { id: 3, type: "UX", count: 8, msg: "Onboarding flow is confusing" },
        { id: 4, type: "Legal", count: 3, msg: "Potential IP conflicts" },
    ];

    const myCollaborations = [
        { id: 201, title: "Smart Waste Bin", role: "Contributor", owner: "Sarah M." },
        { id: 202, title: "Library Ai Assistant", role: "Lead Dev", owner: "James K." },
        { id: 203, title: "UniBus Tracker", role: "UI Designer", owner: "Priya S." },
    ];

    const Modal = ({ title, onClose, children }) => (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="glass-card modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );

    return (
        <div className="profile-page container">
            <div className="profile-header">
                <motion.div
                    className="profile-avatar"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {(localStorage.getItem('userName') || user.name).split(' ').map(n => n[0]).join('')}
                </motion.div>

                {/* Personal Details Section */}
                <div className="glass-card personal-details">
                    <div className="detail-row">
                        <span className="detail-label">Name:</span>
                        <span className="detail-value">{localStorage.getItem('userName') || user.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Age:</span>
                        <span className="detail-value">{user.age}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Occupation:</span>
                        <span className="detail-value">{user.occupation}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Gender:</span>
                        <span className="detail-value">{user.gender}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{getMaskedEmail(user.email)}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Password:</span>
                        <span className="detail-value">**********</span>
                    </div>
                    <button className="btn btn-secondary" onClick={handleLogout} style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center', gap: '0.5rem', color: '#f87171', borderColor: 'rgba(248,113,113,0.2)' }}>
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>

                {/* Interactive Stats Tiles */}
                <div className="profile-stats clickable-stats">
                    <motion.div
                        className="stat-box clickable"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        onClick={() => setActiveModal('ideas')}
                    >
                        <div className="stat-icon"><Lightbulb size={24} color="#2dd4bf" /></div>
                        <div className="stat-value">{user.stats.submitted}</div>
                        <div className="stat-label">Ideas Submitted</div>
                    </motion.div>

                    <motion.div
                        className="stat-box clickable"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        onClick={() => setActiveModal('feedback')}
                    >
                        <div className="stat-icon"><MessageSquare size={24} color="#8b5cf6" /></div>
                        <div className="stat-value">38</div>
                        <div className="stat-label">Feedback Received</div>
                    </motion.div>

                    <motion.div
                        className="stat-box clickable"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        onClick={() => setActiveModal('collab')}
                    >
                        <div className="stat-icon"><Users size={24} color="#f59e0b" /></div>
                        <div className="stat-value">{user.stats.contributions}</div>
                        <div className="stat-label">Collaborations</div>
                    </motion.div>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {activeModal === 'ideas' && (
                    <Modal title="My Submitted Ideas" onClose={() => setActiveModal(null)}>
                        <div className="modal-list">
                            {mySubmittedIdeas.map(idea => (
                                <div key={idea.id} className="modal-item">
                                    <div className="item-info">
                                        <h3>{idea.title}</h3>
                                        <p className="item-sub">Owner: {idea.owner} • {idea.date}</p>
                                    </div>
                                    <div className="item-badge success">
                                        <CreditCard size={14} /> +{idea.credits} Credits
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Modal>
                )}

                {activeModal === 'feedback' && (
                    <Modal title="Feedback Analysis" onClose={() => setActiveModal(null)}>
                        <div className="modal-list">
                            <p className="modal-subtitle">Ranked by frequency</p>
                            {myFeedback.sort((a, b) => b.count - a.count).map(fb => (
                                <div key={fb.id} className="modal-item">
                                    <div className="item-info">
                                        <h3>{fb.msg}</h3>
                                        <p className="item-sub">Category: {fb.type}</p>
                                    </div>
                                    <div className="item-badge warning">
                                        {fb.count} Reports
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Modal>
                )}

                {activeModal === 'collab' && (
                    <Modal title="Active Collaborations" onClose={() => setActiveModal(null)}>
                        <div className="modal-list">
                            {myCollaborations.map(collab => (
                                <div key={collab.id} className="modal-item">
                                    <div className="item-info">
                                        <h3>{collab.title}</h3>
                                        <p className="item-sub">Idea Owner: {collab.owner}</p>
                                    </div>
                                    <div className="item-badge info">
                                        {collab.role}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
