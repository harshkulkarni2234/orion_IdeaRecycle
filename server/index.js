import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Idea from './models/Idea.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/ideas', async (req, res) => {
    try {
        const newIdea = new Idea(req.body);
        const savedIdea = await newIdea.save();
        res.status(201).json(savedIdea);
    } catch (error) {
        console.error('Submission Error:', error);
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/ideas', async (req, res) => {
    try {
        const ideas = await Idea.find().sort({ createdAt: -1 });
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/ideas/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        if (!idea) return res.status(404).json({ message: 'Idea not found' });
        res.json(idea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
