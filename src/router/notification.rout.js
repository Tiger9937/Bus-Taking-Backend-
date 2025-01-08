import {CreateNotification , sendNotification ,removedNotification ,
     SendAllNotification , SendSelectNotification} from '../controler/notification.controler.js'
import {Router} from 'express'
import {jwtVarify} from '../middlewares/auth.middlware.js'

const notifationRout = Router()

notifationRout.route("/CreateNotification").post(jwtVarify,CreateNotification)
notifationRout.route("/sendNotification").get(jwtVarify,sendNotification)
notifationRout.route("removedNotification").get(jwtVarify,removedNotification)
notifationRout.route("SendAllNotification").get(jwtVarify,SendAllNotification)
notifationRout.route("SendSelectNotification").get(jwtVarify,SendSelectNotification)


export default notifationRout;