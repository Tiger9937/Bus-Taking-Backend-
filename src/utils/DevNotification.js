import {NotifyAllUser,NotifySelectedUser} from '../system/notification.system.js'
import Subscriber from '../models/Notifysubscription.modle.js'


const DevNotify =async (message, selectUsers)=>{
    
    if (selectUsers == undefined) {
        await NotifyAllUser(message)
    }else{
        const subscribed_users = await Subscriber.find({
            userid:{$in:selectUsers}
        })
        
        await NotifySelectedUser(subscribed_users,message)
    }
}

export {DevNotify}