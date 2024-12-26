import mongoose from 'mongoose';

const FlowSchema = new mongoose.Schema({
    Flowers:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    Flowing:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }
})

export const Flowers = mongoose.model('Flow', FlowSchema);