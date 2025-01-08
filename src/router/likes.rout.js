import {createLike,get_product_Like,createDislike} from '../controler/Likes.controler.js'
import {Router} from 'express'
import {jwtVarify} from '../middlewares/auth.middlware.js'


const LikeRout = Router()


LikeRout.route("/Like").post(jwtVarify,createLike)
LikeRout.route("/Dislike").post(jwtVarify,createDislike)
LikeRout.route("/get_product_Like").get(jwtVarify,get_product_Like)


export default LikeRout

