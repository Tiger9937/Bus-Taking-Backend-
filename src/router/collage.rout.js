import {Router} from 'express'

import {
    CollageRigster,
    collageDashboard,
    UpdateCollageProfile
} from "../controler/collage.controler.js"

const CollageRoute = Router()

CollageRoute.route("/collageRigster").post(CollageRigster);
CollageRoute.route("/collageDashboard").post(collageDashboard)
CollageRoute.route("/UpdateCollageProfile").post(UpdateCollageProfile)

export default CollageRoute