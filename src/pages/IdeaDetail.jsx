import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, GitFork, ArrowRight, Lightbulb, User, Loader, Bot, GitBranch } from 'lucide-react';
import './IdeaDetail.css';
import { MOCK_IDEAS } from '../data';
import API_BASE_URL from '../api_config';

const IdeaDetail = () => {
    const { id } = useParams();
    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/ideas/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setIdea(data);
                } else {
                    // Fallback to MOCK_IDEAS for testing/demo
                    const mock = MOCK_IDEAS.find(i => i.id === parseInt(id) || i._id === id);
                    setIdea(mock);
                }
            } catch (error) {
                console.error('Error fetching idea:', error);
                const mock = MOCK_IDEAS.find(i => i.id === parseInt(id) || i._id === id);
                setIdea(mock);
            } finally {
                setLoading(false);
            }
        };

        fetchIdea();
    }, [id]);

    const generateAIInsight = async () => {
        if (!idea) return;
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            alert("Please add VITE_GEMINI_API_KEY to your .env file!");
            return;
        }

        setIsAnalyzing(true);
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            const prompt = `Analyze this failed startup idea:
            Title: ${idea.title}
            Problem: ${idea.problem}
            Solution: ${idea.solution}
            Failure Reason: ${idea.failureReason}
            
            Provide a concise 3-bullet point analysis on:
            1. Why it really failed (deeper insight).
            2. One specific pivot strategy to make it work.
            3. A rating of "Salvageable" or "Move On" with a 1-sentence explanation.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            setAiAnalysis(text);
        } catch (error) {
            console.error("Error generating insight:", error);
            if (error.message?.includes("429")) {
                setAiAnalysis("AI Quota Exceeded. Please try again in a minute or check your Google AI Studio billing/limits.");
            } else if (error.message?.includes("404")) {
                setAiAnalysis("Model not found. We are working on fixing the AI configuration.");
            } else {
                setAiAnalysis("Failed to generate insight. Please check your network and API key.");
            }
        }
        setIsAnalyzing(false);
    };

    if (loading) {
        return (
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Loader className="spin" size={48} color="var(--primary-color)" />
            </div>
        );
    }

    if (!idea) {
        return (
            <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
                <h2>Idea not found</h2>
                <Link to="/dashboard" className="btn btn-secondary">Go back to Explore</Link>
            </div>
        );
    }

    return (
        <div className="detail-page container">
            <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textDecoration: 'none' }}>
                <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Explore
            </Link>

            <div className="detail-header">
                <div className="detail-meta">
                    <span className={`tag tag-${idea.category === 'Sustainability' ? 'social' : idea.category === 'EdTech' ? 'tech' : 'business'}`}>
                        {idea.category}
                    </span>
                    <span className="tag" style={{ background: 'rgba(255,255,255,0.1)' }}>{idea.failureStage || idea.stage || 'Validation'}</span>
                </div>
                <h1 className="detail-title">{idea.title}</h1>
                <p className="detail-subtitle">{idea.desc || (idea.problem ? idea.problem.substring(0, 150) + '...' : '')}</p>
            </div>

            <div className="detail-content">
                <div className="main-content">
                    <section>
                        <div className="section-label"><AlertTriangle size={18} /> The Problem</div>
                        <p className="text-content">{idea.problem}</p>
                    </section>

                    <section>
                        <div className="section-label"><TrendingUp size={18} /> Original Solution</div>
                        <p className="text-content">{idea.solution}</p>
                    </section>

                    <section>
                        <div className="section-label" style={{ color: '#ef4444' }}> Why It Failed</div>
                        <div className="glass-card" style={{ borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)', padding: '1.5rem' }}>
                            <p className="text-content" style={{ marginBottom: 0, color: '#fca5a5' }}>"{idea.failureReason}"</p>
                        </div>
                    </section>

                    <section>
                        <button
                            className="btn btn-secondary"
                            onClick={generateAIInsight}
                            disabled={isAnalyzing}
                            style={{ width: '100%', marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            {isAnalyzing ? <Loader className="spin" size={20} /> : <Bot size={20} />}
                            {isAnalyzing ? "Analyzing Failure Patterns..." : "Ask AI: Why did this fail?"}
                        </button>

                        {aiAnalysis && (
                            <motion.div
                                className="glass-card"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                style={{ background: 'rgba(139, 92, 246, 0.1)', borderColor: '#8b5cf6' }}
                            >
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', color: '#a78bfa' }}>
                                    <Bot size={24} />
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Gemini Analysis</h3>
                                </div>
                                <div className="text-content" style={{ whiteSpace: 'pre-line' }}>
                                    {aiAnalysis}
                                </div>
                            </motion.div>
                        )}
                    </section>


                    <section className="feedback-section">
                        <h3 className="sidebar-title">Community Analysis</h3>
                        <div className="feedback-grid">
                            <div className="feedback-card">
                                <span className="feedback-label">Market Viability</span>
                                <div className="feedback-score" style={{ color: '#34d399' }}>High</div>
                                <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Strong demand from sustainability offices.</p>
                            </div>
                            <div className="feedback-card">
                                <span className="feedback-label">Tech Complexity</span>
                                <div className="feedback-score" style={{ color: '#f87171' }}>High</div>
                                <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>POS integration is the main bottleneck.</p>
                            </div>
                            <div className="feedback-card">
                                <span className="feedback-label">Scope</span>
                                <div className="feedback-score" style={{ color: '#fbbf24' }}>Too Broad</div>
                                <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Needs simplification.</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="detail-sidebar">
                    <motion.div
                        className="glass-card action-card"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="sidebar-title">Recycle This Idea</h3>
                        <p className="action-text">See a way to make this work? Fork it and take the lead.</p>
                        <Link to={`/recycle/${id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            <GitBranch size={18} /> Continue / Pivot
                        </Link>
                    </motion.div>

                    <div className="glass-card sidebar-card">
                        <h3 className="sidebar-title">Contributors</h3>
                        <div className="contributor">
                            <div className="author-avatar-sm">SM</div>
                            <div>
                                <div className="author-name">Sarah M.</div>
                                <div className="author-school">Original Creator</div>
                            </div>
                        </div>
                        <div className="contributor">
                            <div className="author-avatar-sm" style={{ background: 'var(--primary-color)', color: 'black' }}>JD</div>
                            <div>
                                <div className="author-name">John D.</div>
                                <div className="author-school">Market Analysis</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeaDetail;
