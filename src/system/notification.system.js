// notificationsystem is a function 
// Iget main 2 things one is message and VAPID keys
//          setup 
// install body-perser and wabpush
// Setkey for publicVapidKey and privateVapidKey 
// set body-perser in app.js (app.use(bodyParser.json());)
// i create a class that can construct everytime and this class make a json file and that json file contain message 
// after sending return true  

import webpush from 'web-push';
import AllSubscribe from '../models/Notifysubscription.modle.js'


async function NotifyAllUser(message) {
    try {
        webpush.setGCMAPIKey(process.env.FIREBASE_KEY)
        
        webpush.setVapidDetails(`mailto:${process.env.MY_EMAIL}`,process.env.WEB_PUSH_PUBLICKEY,process.env.WEB_PUSH_PRIVATEKEY);
        
        const GetallSubscribe =  await AllSubscribe.find()

        
        for (const UserInfo of GetallSubscribe) {
            
            let Issubscriber = {
                endpoint: UserInfo.endpoint,
                keys: {
                    auth: UserInfo.aurh_Key,
                    p256dh: UserInfo.p256dh_key
                }
            }
            try {
                console.log(message)
                await webpush.sendNotification(Issubscriber, JSON.stringify(message));
                console.log("Break point")
            } catch (error) {
                console.log(error)
            }

        }

    } catch (error) {
        console.log(error)
    }
}

async function NotifySelectedUser(subscribed_users,message) {
    try {
        // TODO::give subscribed_users must be on array
        for (const Subscriber of subscribed_users) {
            let Issubscriber = {
                endpoint: Subscriber.endpoint,
                keys: {
                    auth: UserInfo.aurh_Key,
                    p256dh: UserInfo.p256dh_key
                }
            }
            await webpush.sendNotification(Issubscriber, message);
        }

    } catch (error) {
        console.log(error)
    }
}

export {NotifyAllUser , NotifySelectedUser}