import mongoose from 'mongoose'

const ratingSchma = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    rating:{
        type:Number,
        required: true,
        min:0,
        max:5
    },
    // product
    Project:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
    },
})

export const Rating = mongoose.model('Rading',ratingSchma)