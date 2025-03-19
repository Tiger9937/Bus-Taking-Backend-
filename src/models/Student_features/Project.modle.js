
import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
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
    thumbnail:{
        type: String,
        required: true
    },

    technologiesUsed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'technology'
      }
    ],

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
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    totalmember:{
        type:Number
    },
    goal: {
        type: String,
        required: true
    },
    outcome: {
        type: String,
        required: false
    },
    budget: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    ispublicis:{
        type:Boolean,
        default:true
    },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rading'
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

export  const Project = mongoose.model('Project', projectSchema)