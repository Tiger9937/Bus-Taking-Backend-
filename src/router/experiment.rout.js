import {Router} from 'express'
import {experiment} from '../controler/experiment.controler.js'
import {upload} from "../middlewares/multer.middlewares.js";

const exp = Router()

exp.route("/testing").post(upload.fields([
        {
            name:"pdf_file",
            maxCount:1
        }
    ]),experiment)

export default exp