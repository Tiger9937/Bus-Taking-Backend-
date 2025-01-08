import { ApiError } from '../utils/ApiError.js'
import { Apires } from '../utils/Apires.js'
import {asyncHandel} from '../utils/asyncHandaler.js'


const CreateNotification = asyncHandel(async (req,res)=>{
    const {sender_ID,message,receiver_ID} = req.body
    console.log(sender_ID,message,receiver_ID)

    if (!sender_ID && !message && !receiver_ID) {
        throw new ApiError(400,"All fields are required")
    }

    // send req for spcifc student  

})

const sendNotification_user = asyncHandel(async ()=>{
    // req.user._id
    const {sender_ID,receiver_ID} = req.query

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



export { CreateNotification , sendNotification_user ,removedNotification , SendAllNotification_college_student , SendSelectNotification_college_student}