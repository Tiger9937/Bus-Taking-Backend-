import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
    college:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college',
    },
    notification:{
        type: String,
        required: true,
    },
    type: { // Type of notification (e.g., info, warning, success)
        type: String,
        enum: ['info', 'warning', 'success', 'error'],
        default: 'info',
    },
    isRead: { // Track whether the notification has been read
        type: Boolean,
        default: false,
    },
},{timestamps: true})

export const notification = model('notification', notificationSchema);
