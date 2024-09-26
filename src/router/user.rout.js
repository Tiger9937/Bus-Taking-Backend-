import { Router } from "express";
import { Register_User,
        Login_User ,
        Logout_User,
        AccountDetails_Change,
        UpDateAvatar_image,
        Password_Change,
        refreshAccessToken
} from "../controler/user.controler.js";
import {upload} from "../middlewares/multer.middlewares.js";
import {jwtVarify} from '../middlewares/auth.middlware.js';
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

UserRouter.route('/login').post(Login_User)

UserRouter.route('/refreshAccessToken').post(refreshAccessToken)

UserRouter.route('/logout').post(jwtVarify,Logout_User)

UserRouter.route('/UpDateAvatar_image').patch(jwtVarify,upload.single("avater"),UpDateAvatar_image)

UserRouter.route('/AccountDetails_Change').patch(jwtVarify,AccountDetails_Change)

UserRouter.route('/Password_Change').post(jwtVarify,Password_Change)


export default UserRouter