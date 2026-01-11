import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Share2, Search, GitFork, Rocket } from 'lucide-react';
import './Landing.css';

const Landing = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="landing-page">
            <div className="blob blob-1"></div>

            {/* Hero Section */}
            <motion.section
                className="hero-section"
                initial="hidden"
                animate="visible"
                variants={stagger}
            >
                <motion.div className="hero-badge" variants={fadeInUp}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-color)' }}></span>
                    Where failed ideas find new life
                </motion.div>

                <motion.h1 className="hero-title" variants={fadeInUp}>
                    Bad ideas aren’t useless —<br />
                    <span className="gradient-text">they’re recyclable.</span>
                </motion.h1>

                <motion.p className="hero-subtitle" variants={fadeInUp}>
                    Don't let your rejected project die. Share it, let others improve it,
                    and watch your abandoned idea transform into something extraordinary.
                </motion.p>

                <motion.div className="hero-buttons" variants={fadeInUp}>
                    <Link to="/submit" className="btn btn-primary">
                        Submit an Idea <ArrowRight size={18} />
                    </Link>
                    <Link to="/dashboard" className="btn btn-secondary">
                        Explore Ideas
                    </Link>
                </motion.div>
            </motion.section>

            {/* How It Works */}
            <section className="process-section" id="how-it-works">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How IdeaRecycle Works</h2>
                        <p className="section-subtitle">
                            A simple process to transform failures into opportunities for collective growth.
                        </p>
                    </div>

                    <div className="process-grid">
                        {[
                            {
                                icon: <Share2 size={24} />,
                                title: "Share Your Story",
                                desc: "Share your failed or abandoned project along with why it didn't work out."
                            },
                            {
                                icon: <Search size={24} />,
                                title: "Discover Opportunities",
                                desc: "Explore ideas from other students. Filter by category, failure reason, or potential."
                            },
                            {
                                icon: <GitFork size={24} />,
                                title: "Fork & Improve",
                                desc: "Fork ideas, suggest pivots, or team up with original creators to refine concepts."
                            },
                            {
                                icon: <Rocket size={24} />,
                                title: "Ship Together",
                                desc: "Turn recycled ideas into reality. Get mentorship and celebrate successful ventures."
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                className="glass-card process-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="process-step">0{index + 1}</div>
                                <div className="step-content">
                                    <div className="process-icon">{step.icon}</div>
                                    <h3 className="process-title">{step.title}</h3>
                                    <p className="process-desc">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Real-time Metrics */}
            <section className="metrics-section">
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '3rem' }}>
                        <h2 className="section-title">Real-time Impact Metrics</h2>
                    </div>
                    <motion.div
                        className="metrics-grid"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="metric-item glass-card">
                            <div className="metric-number">12k+</div>
                            <div className="metric-label">Ideas Recycled</div>
                        </div>
                        <div className="metric-item glass-card">
                            <div className="metric-number">8,500+</div>
                            <div className="metric-label">Active Students</div>
                        </div>
                        <div className="metric-item glass-card">
                            <div className="metric-number">340+</div>
                            <div className="metric-label">Success Stories</div>
                        </div>
                        <div className="metric-item glass-card">
                            <div className="metric-number">95%</div>
                            <div className="metric-label">Positive Feedback</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="blob blob-2"></div>
        </div>
    );
};

export default Landing;
