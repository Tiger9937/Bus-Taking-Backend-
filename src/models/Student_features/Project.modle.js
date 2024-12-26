
import mongoose from "mongoose";

// Define the schema for a project
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Ongoing', 'Completed', 'Planned'],
        default: 'Planned'
    },
    technologiesUsed: {
        type: [String], // Array of strings to list technologies
        required: true,
        text: [string]
    },
    startDate: {
        type: Date,
        required: true
    },
    readme:{
        type: String,
        required: true
    },
    endDate: {
        type: Date,
        required: false // Can be empty if the project is ongoing
    },
    teamMembers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    goals: {
        type: String,
        required: true
    },
    outcome: {
        type: String,
        required: false
    },
    budget: {
        type: Number,
        required: false
    },
    rating: {
        type: [svg],
        required: false
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    },
    socialLinks: {
        type: [String],
        required: false
    }
},{timestamps:true});

export const Project = mongoose.model('Project', projectSchema)
