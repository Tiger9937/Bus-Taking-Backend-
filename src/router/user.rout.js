import { Router } from "express";
import { Register_User,Login_User ,Logout_User} from "../controler/user.controler.js";
import {upload} from "../middlewares/multer.middlewares.js";
import {jwtVarify} from '../middlewares/auth.middlware.js';

console.log(Register_User);

const UserRouter = Router()

UserRouter.route('/regidter').post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
    ])
    ,Register_User
)
UserRouter.route('/login').post(
    Login_User
)
UserRouter.route('/logout').post(jwtVarify,Logout_User)

export default UserRouter