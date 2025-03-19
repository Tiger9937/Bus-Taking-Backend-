import {Router} from 'express'
import {CreateMidia , removiedMidia , AccessMidia } from '../controler/socialLinks.controler.js'
import {jwtVarify} from '../middlewares/auth.middlware.js';


const MidiaRouter = Router()

MidiaRouter.route("/CreateMidia").post(jwtVarify,CreateMidia)

MidiaRouter.route("/Access/mdiaID").get(jwtVarify,AccessMidia)

MidiaRouter.route("/removed").post(jwtVarify,removiedMidia)

export default MidiaRouter