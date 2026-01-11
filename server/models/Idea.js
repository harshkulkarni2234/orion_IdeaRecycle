import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Tech', 'Business', 'Social Impact', 'Research', 'Social', 'Sustainability', 'EdTech', 'Health']
    },
    stage: {
        type: String,
        required: true,
        enum: ['Ideation', 'Prototype', 'Validation', 'Launch']
    },
    problem: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    failureReason: {
        type: String,
        required: true
    },
    collaboration: {
        type: Boolean,
        default: false
    },
    feedback: {
        type: Boolean,
        default: false
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    author: {
        type: String,
        default: 'Student'
    },
    school: {
        type: String,
        default: 'University'
    },
    stats: {
        forks: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
        views: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
