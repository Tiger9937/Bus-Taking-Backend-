import mongoose from 'mongoose'

const FollowersSchema = new mongoose.Schema({
    Follow:{
        Types : mongoose.Schema.ObjectId,
        ref:"User",
        require: true
    },
    Followers:{
        Types : mongoose.Schema.ObjectId,
        ref:"User",
        require: true
    }
})
export const Followers = mongoose.model('Followers', FollowersSchema)