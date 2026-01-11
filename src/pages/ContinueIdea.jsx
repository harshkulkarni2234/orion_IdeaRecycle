import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Rocket, GitBranch, Target, Zap } from 'lucide-react';
import './ContinueIdea.css';
import '../pages/SubmitIdea.css';
import API_BASE_URL from '../api_config';

const ContinueIdea = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pivotType, setPivotType] = useState('Improvement');

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/ideas/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setIdea(data);
                }
            } catch (error) {
                console.error('Error fetching idea:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchIdea();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Idea Recycled:", pivotType);
        navigate('/dashboard');
    };

    if (loading) return null; // Or a loader

    return (
        <div className="recycle-page container">
            <button onClick={() => navigate(-1)} className="btn-secondary-text" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <ArrowLeft size={16} /> Back to Idea
            </button>

            <div className="recycle-header">
                <h1 className="page-title">Recycle This Idea</h1>
                <p className="page-subtitle">How will you transform this failure into success?</p>
            </div>

            <div className="idea-context">
                <div className="context-label">Original Concept</div>
                <div className="context-title">{idea?.title || 'Original Concept'}</div>
            </div>

            <motion.form
                className="glass-card submit-form-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
            >
                <div className="form-section">
                    <label className="form-label" style={{ marginBottom: '1rem', display: 'block' }}>Choose your approach</label>
                    <div className="pivot-options">
                        <div
                            className={`pivot-card ${pivotType === 'Market' ? 'selected' : ''}`}
                            onClick={() => setPivotType('Market')}
                        >
                            <div className="pivot-icon"><Target size={24} /></div>
                            <div className="pivot-label">Market Pivot</div>
                            <div className="pivot-desc">Keep technology, change the target audience</div>
                        </div>

                        <div
                            className={`pivot-card ${pivotType === 'Scope' ? 'selected' : ''}`}
                            onClick={() => setPivotType('Scope')}
                        >
                            <div className="pivot-icon"><Zap size={24} /></div>
                            <div className="pivot-label">Scope Simplification</div>
                            <div className="pivot-desc">Strip it down to the core value proposition</div>
                        </div>

                        <div
                            className={`pivot-card ${pivotType === 'Improvement' ? 'selected' : ''}`}
                            onClick={() => setPivotType('Improvement')}
                        >
                            <div className="pivot-icon"><Rocket size={24} /></div>
                            <div className="pivot-label">Tech Improvement</div>
                            <div className="pivot-desc">Solve the technical blockers the original team faced</div>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 600 }}>Your Plan</h3>

                    <div className="form-group">
                        <label className="form-label">Proposed Title (Optional)</label>
                        <input type="text" className="form-input" placeholder="New title or keep original" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">What will you do differently?</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Describe your pivot or improvement strategy..."
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Needed collaborators?</label>
                        <input type="text" className="form-input" placeholder="e.g. Frontend Dev, Marketing" />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Fork & Launch <GitBranch size={18} />
                </button>
            </motion.form>
        </div>
    );
};

export default ContinueIdea;
