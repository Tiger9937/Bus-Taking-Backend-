import {Router} from 'express'
import {createtech , AccessTech , removedTech} from '../controler/tech.controler.js'
import {jwtVarify} from '../middlewares/auth.middlware.js';

const techRouter = Router()

techRouter.route("/Createtech").post(jwtVarify,createtech)

techRouter.route("/Access/:techID").get(jwtVarify,AccessTech)

techRouter.route("/removed").post(jwtVarify,removedTech)

export default techRouter