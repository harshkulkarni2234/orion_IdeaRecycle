import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, MessageSquare, GitFork, AlertCircle } from 'lucide-react';
import './Dashboard.css';

import { MOCK_IDEAS } from '../data';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import API_BASE_URL from '../api_config';

const Dashboard = () => {
    const [filter, setFilter] = useState('All');
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/ideas`);
                if (response.ok) {
                    const data = await response.json();
                    setIdeas(data.length > 0 ? data : MOCK_IDEAS);
                } else {
                    setIdeas(MOCK_IDEAS);
                }
            } catch (error) {
                console.error('Error fetching ideas:', error);
                setIdeas(MOCK_IDEAS);
            } finally {
                setLoading(false);
            }
        };

        fetchIdeas();
    }, []);

    const filters = ['All', 'Tech', 'Business', 'Social', 'Research'];

    const filteredIdeas = filter === 'All'
        ? ideas
        : ideas.filter(idea => {
            if (filter === 'Tech') return idea.category === 'EdTech' || idea.category === 'Tech'; // Simple mapping for demo
            if (filter === 'Social') return idea.category === 'Sustainability' || idea.category === 'Social';
            return idea.category === filter;
        });

    if (loading) {
        return (
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Loader className="spin" size={48} color="var(--primary-color)" />
            </div>
        );
    }

    return (
        <div className="dashboard-page container">
            <div className="dashboard-header">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="hero-badge">Trending Now</span>
                </motion.div>
                <motion.h1
                    className="page-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Ideas Ready for Recycling
                </motion.h1>
                <p className="page-subtitle">
                    Discover promising concepts waiting for fresh perspectives and new collaborators
                </p>
            </div>

            <div className="filter-bar">
                {filters.map(f => (
                    <button
                        key={f}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <motion.div
                layout
                className="ideas-grid"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {filteredIdeas.map((idea) => (
                    <motion.div
                        key={idea._id || idea.id}
                        className="glass-card idea-card"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        onClick={() => navigate(`/idea/${idea._id || idea.id}`)}
                    >
                        <div className="idea-header">
                            <span className={`tag tag-${idea.category === 'Sustainability' || idea.category === 'Social' ? 'social' :
                                idea.category === 'EdTech' || idea.category === 'Tech' ? 'tech' :
                                    idea.category === 'Research' ? 'research' : 'business'}`}>
                                {idea.category}
                            </span>
                            <span className="tag" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>{idea.stage || 'Active'}</span>
                        </div>

                        <h3 className="idea-title">{idea.title}</h3>
                        <p className="idea-desc">{idea.desc || idea.problem.substring(0, 100) + '...'}</p>

                        <div className="failure-reason">
                            <AlertCircle size={14} />
                            {idea.failureReason}
                        </div>

                        <div className="author-info">
                            <div className="author-avatar-sm">{(idea.author || 'S').charAt(0)}</div>
                            <div>
                                <div className="author-name">{idea.author || 'Anonymous'}</div>
                                <div className="author-school">{idea.school || 'University'}</div>
                            </div>
                            <div className="idea-stats">
                                <div className="stat"><GitFork size={14} /> {idea.stats?.forks || 0}</div>
                                <div className="stat"><MessageSquare size={14} /> {idea.stats?.comments || 0}</div>
                                <div className="stat"><Eye size={14} /> {idea.stats?.views || 0}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Dashboard;

