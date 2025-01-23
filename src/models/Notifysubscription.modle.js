import mongoose from 'mongoose'

const subscribtionSchma = new mongoose.Schema({ 
        userid:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        endpoint:{
            type:String,
            required:true
        },
        aurh_Key:{
            type:String,
            required:true
        },
        p256dh_key:{
            type:String,
            required:true
        },
        
    
})

export default mongoose.model('subscribtion',subscribtionSchma)