import {CreateNotification ,  removedNotification , sendNotification_user,
     SendAllNotification_college_student , SendSelectNotification_college_student,SubscribeToNotify} from '../controler/notification.controler.js'
import {Router} from 'express'
import {jwtVarify} from '../middlewares/auth.middlware.js'

const notifationRout = Router()

notifationRout.route("/CreateNotification").post(jwtVarify,CreateNotification)
notifationRout.route("/removedNotification").get(jwtVarify,removedNotification)
notifationRout.route("/SendAllNotification_college_student").get(jwtVarify,SendAllNotification_college_student)
notifationRout.route("/SendSelectNotification_college_student").get(jwtVarify,SendSelectNotification_college_student)

notifationRout.route("/sendNotification_user").get(jwtVarify,sendNotification_user)

notifationRout.route("/save-subscription").post(jwtVarify,SubscribeToNotify)

export default notifationRout;