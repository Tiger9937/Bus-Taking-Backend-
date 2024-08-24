import { Router } from "express";
import { Register_User } from "../controler/user.controler.js";
import {upload} from "../middlewares/multer.middlewares.js";


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

export default UserRouter