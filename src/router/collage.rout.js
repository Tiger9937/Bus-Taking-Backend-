import {Router} from 'express'

import {
    CollageRigster,
    collageDashboard,
    UpdateCollageProfile,
    Access_All_Collage
} from "../controler/collage.controler.js"
import { upload } from '../middlewares/multer.middlewares.js';

const CollageRoute = Router()
// TODO:: Add for handle cover image 
CollageRoute.route("/collageRigster").post(upload.fields(
    [
        {
            name: "profile_image",
            maxCount:1
        }
    ]
),CollageRigster);
CollageRoute.route("/colleges").get(Access_All_Collage);
CollageRoute.route("/collageDashboard").post(collageDashboard)
CollageRoute.route("/UpdateCollageProfile").post(UpdateCollageProfile)

export default CollageRoute