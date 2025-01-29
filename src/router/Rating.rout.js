import {Router} from 'express'
import {Addrating , AvrageRading , ratingupdate , removedrating} from '../controler/rating.controler.js'
import { jwtVarify } from '../middlewares/auth.middlware.js'

const RatingRouter = Router()

RatingRouter.route("/Addrating").post(Addrating)
RatingRouter.route("/AvrageRading").post(AvrageRading)
RatingRouter.route("/ratingupdate").post(jwtVarify,ratingupdate)
RatingRouter.route("/removedrating").post(jwtVarify,removedrating)

export default RatingRouter