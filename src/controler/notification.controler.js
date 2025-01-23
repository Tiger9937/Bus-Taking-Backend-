import { ApiError } from '../utils/ApiError.js'
import { Apires } from '../utils/Apires.js'
import {DevNotify} from '../utils/DevNotification.js'
import {asyncHandel} from '../utils/asyncHandaler.js'
import Subscriber from '../models/Notifysubscription.modle.js'


const SubscribeToNotify = asyncHandel(async(req , res)=>{
    const {endpoint , keys}=req.body
    
    
    if (!endpoint && !keys) {
        throw new ApiError(400,"all filds are requred To Subscribe")
    }

    let aurh_Key = keys.auth
    let p256dh_key = keys.p256dh

    Subscriber.create({
        userid:req.user._id,
        endpoint,
        aurh_Key,
        p256dh_key
    })

    res.status(201).json({ message: `User Subscribe`});
})

const CreateNotification = asyncHandel(async (req,res)=>{
    const {sender_ID,message,receiver_ID} = req.body
    console.log(sender_ID,message,receiver_ID)

    if (!sender_ID && !message && !receiver_ID) {
        throw new ApiError(400,"All fields are required")
    }

    // send req for spcifc student  

})

const sendNotification_user = asyncHandel(async (req,res)=>{
    // req.user._id
    const {messeges} = req.query
    console.log(messeges)
    // throw new ApiError(400,"stop du to debuging")
    let messege = {
        title:"Well come",
        body:"this is just a test",
        icon:"https://images.unsplash.com/photo-1737419997505-a6586ab9e290?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
    await DevNotify(messege)
    res.status(201).json({ message: `user send notification successfull`});
})

const SendAllNotification_college_student = asyncHandel(async()=>{
    // this req use by student,college and user
    // notifier is may be student,college or user and get all the notification for them
    const {...notifier} = req.query
})

const SendSelectNotification_college_student = asyncHandel(async()=>{
    // use by student and college and user
    const {Notificationid,...notifier} = req.query
})

const removedNotification = asyncHandel(async ()=>{
    const {Notificationid} = req.query
})



export { 
    CreateNotification ,sendNotification_user ,removedNotification , 
    SendAllNotification_college_student , SendSelectNotification_college_student , 
    SubscribeToNotify
}