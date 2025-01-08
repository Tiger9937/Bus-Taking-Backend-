import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    Like:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    Dislike:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    // product 
    Project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
},{timestamps:true})

export const Like = mongoose.model('Like', LikeSchema);
