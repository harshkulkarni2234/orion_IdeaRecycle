import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, ThumbsUp, User } from 'lucide-react';
import './Dashboard.css'; // Reusing dashboard styles for cards

import { MOCK_REVIEWS, STORIES } from '../data';

const Community = () => {
    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
            <div className="dashboard-header">
                <h1 className="page-title">Community Stories</h1>
                <p className="page-subtitle">
                    Real stories from students who turned setbacks into comebacks.
                </p>
            </div>

            <div className="stories-grid" style={{ marginTop: '2rem' }}>
                {MOCK_REVIEWS.map((review, i) => (
                    <motion.div
                        key={review.id}
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ padding: '2rem' }}
                    >
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', color: '#fbbf24' }}>
                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" />)}
                        </div>

                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                            "{review.content}"
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    background: 'var(--gradient-main)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                }}>
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{review.author}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{review.role}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <ThumbsUp size={16} /> {review.likes}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Stories Section from Dashboard */}
            <div className="stories-header" style={{ marginTop: '5rem', marginBottom: '2rem', textAlign: 'center' }}>
                <h2 className="section-title">Success Stories</h2>
                <p className="section-subtitle">Hear from students who transformed their failures into learning opportunities</p>
            </div>

            <div className="stories-grid">
                {STORIES.map((story, i) => (
                    <motion.div
                        key={i}
                        className="glass-card story-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="quote-icon">"</div>
                        <div className="story-content">
                            <p className="story-quote">{story.quote}</p>
                            <div className="story-author">
                                <div className="author-avatar">{story.author.charAt(0)}</div>
                                <div>
                                    <div className="author-name" style={{ fontWeight: 'bold' }}>{story.author}</div>
                                    <div className="author-school" style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>
                                        {story.role}
                                    </div>
                                    <div className="author-school" style={{ fontSize: '0.8rem' }}>{story.school}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Community;
