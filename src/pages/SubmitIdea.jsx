import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, Check, AlertTriangle, Lightbulb, Loader } from 'lucide-react';
import './SubmitIdea.css';
import API_BASE_URL from '../api_config';

const SubmitIdea = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Tech',
        stage: 'Ideation',
        problem: '',
        solution: '',
        failureReason: '',
        collaboration: false,
        feedback: false,
        isAnonymous: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/ideas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Submission Success:', data);
                navigate('/dashboard');
            } else {
                const errData = await response.json();
                alert(`Error: ${errData.message}`);
            }
        } catch (error) {
            console.error('Submission Error:', error);
            alert('Failed to connect to the server. Is the backend running?');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="submit-page container">
            <div className="submit-header">
                <h1 className="page-title">Submit Failed Idea</h1>
                <p className="page-subtitle">Your failure is someone else's case study—or their next big win.</p>
            </div>

            <motion.form
                className="glass-card submit-form-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
            >
                <div className="form-section">
                    <div className="form-section-title"><Lightbulb size={18} /> The Concept</div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Idea Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-input"
                                placeholder="e.g. Uber for Cats"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                name="category"
                                className="form-select"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="Tech">Tech</option>
                                <option value="Business">Business</option>
                                <option value="Social">Social Impact</option>
                                <option value="Research">Research</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Problem Statement</label>
                        <textarea
                            name="problem"
                            className="form-textarea"
                            placeholder="What problem were you trying to solve?"
                            value={formData.problem}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Original Solution</label>
                        <textarea
                            name="solution"
                            className="form-textarea"
                            placeholder="How did you attempt to solve it?"
                            value={formData.solution}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <div className="form-section-title" style={{ color: '#ef4444' }}><AlertTriangle size={18} /> The Failure</div>

                    <div className="form-group">
                        <label className="form-label">Failure Stage</label>
                        <select
                            name="stage"
                            className="form-select"
                            value={formData.stage}
                            onChange={handleChange}
                        >
                            <option value="Ideation">Ideation (Bar napkin)</option>
                            <option value="Prototype">Prototype / MVP</option>
                            <option value="Validation">User Validation</option>
                            <option value="Launch">Post-Launch</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Why did it fail? (Mandatory)</label>
                        <textarea
                            name="failureReason"
                            className="form-textarea"
                            placeholder="Be honest. Did the team break up? No market need? Ran out of money? This is where the learning happens."
                            value={formData.failureReason}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <div className="form-section-title" style={{ color: '#fbbf24' }}><Lightbulb size={18} /> Purpose of Submission</div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        What are you looking for by sharing this idea? (Select all that apply)
                    </p>

                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <label className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                name="collaboration"
                                checked={formData.collaboration}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <div className="checkbox-custom"><Check size={14} /></div>
                            <span className="checkbox-label">Seeking Collaborators</span>
                        </label>

                        <label className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                name="feedback"
                                checked={formData.feedback}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <div className="checkbox-custom"><Check size={14} /></div>
                            <span className="checkbox-label">Just Feedback</span>
                        </label>
                    </div>
                </div>

                <div className="form-section">
                    <label className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            name="isAnonymous"
                            checked={formData.isAnonymous}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        <div className="checkbox-custom"><Check size={14} /></div>
                        <span className="checkbox-label">Submit Anonymously</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving to Database...' : 'Submit for Recycling'}
                    {isSubmitting ? <Loader className="spin" size={18} /> : <Send size={18} />}
                </button>
            </motion.form>
        </div>
    );
};

export default SubmitIdea;
