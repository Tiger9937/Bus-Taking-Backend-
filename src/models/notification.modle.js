import {mongoose, Schema, model } from "mongoose";

const notificationSchema = new Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    student: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Student'
    },
    college:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college'
    },
    notification:{
        type: String,
        required: true
    },
    type: { // Type of notification (e.g., info, warning, success)
        type: String,
        enum: ['info', 'warning', 'success', 'error'],
        default: 'info'
    },
    isRead: { // Track whether the notification has been read
        type: Boolean,
        default: false
    },

    // product 
    Project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
},{timestamps: true})

export const Notification = model('notification', notificationSchema);
