import {followStudent , unfollowStudent,getCounts,getFollowers,getFollowing} from '../controler/flow.controler.js'
import { Router } from 'express'
import {jwtVarify} from '../middlewares/auth.middlware.js'

const flowrout = Router()


flowrout.route("/followStudent").post(jwtVarify,followStudent)

flowrout.route("/unfollowUser").post(jwtVarify,unfollowStudent)

flowrout.route("/getCounts").get(jwtVarify,getCounts)



flowrout.route("/getFollowers").get(jwtVarify,getFollowers)



flowrout.route("/getFollowing").get(jwtVarify,getFollowing)


export default flowrout