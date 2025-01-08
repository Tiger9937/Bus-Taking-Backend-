
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
        tech:[{
            title:{
                type: String,
                required: true,
            },
            platform_Img: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            }
          }]        
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
    totalmember:{
        type:Number
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
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    notification:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notification'
    },
    TotalLike:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    },
    TotalDisLike:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    socialLinks: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'socialMedias'
    }
},{timestamps:true});

export const Project = mongoose.model('Project', projectSchema)
