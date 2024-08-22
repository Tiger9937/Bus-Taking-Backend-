import { Router } from "express";
import { Regester_User } from "../controler/user.controler.js";
import {upload} from "../middlewares/multer.middlewares.js";


console.log(Regester_User);

const UserRouter = Router()

UserRouter.route('/regidter').post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
    ])
    ,Regester_User
)

export default UserRouter