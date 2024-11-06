import mongoose, { Types } from 'mongoose'

const addressSchema = new mongoose.Schema(
    {
        countrie:{
            type: String,
            required: true,
        },
        state : {
            type: String,
            required: true,
        },
        District:{
            type:String,
            required: true
        },
        at:{
            type:String,
            required: true
        },
        po:{
            type:String,
            required: true
        },
        Village:{
            type:String
        },
        city:{
            type:String,
        },
        pincode:{
            type:String,
            required: true
        },
        Nearer_Landmark:{
            type:String,
            required: true
        },
    }
) 
export const Addresses = mongoose.model("Addresses",addressSchema);