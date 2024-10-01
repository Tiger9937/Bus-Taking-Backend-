import {Router} from 'express'

import {
    CollageRigster
} from "../controler/collage.controler.js"

const CollageRoute = Router()

CollageRoute.route("/collageRigster").post(CollageRigster);

export default CollageRoute