import {Router} from 'express'
import {CreateMidia , AccessAllMidia , RemovedAllMidia , RemovedSelectedMidias , AddMidia , AccessAllMidiafottest } from '../controler/socialLinks.controler.js'
import {jwtVarify} from '../middlewares/auth.middlware.js';


const MidiaRouter = Router()

MidiaRouter.route("/CreateMidia").post(jwtVarify,CreateMidia)

MidiaRouter.route("/AccessAllMidia").get(jwtVarify,AccessAllMidia)
MidiaRouter.route("/AccessAllMidiafottest").get(jwtVarify,AccessAllMidiafottest)

MidiaRouter.route("/RemovedAllMidia/:MidialId").get(jwtVarify,RemovedAllMidia)

MidiaRouter.route("/RemovedSelectedMidias").patch(jwtVarify,RemovedSelectedMidias)

MidiaRouter.route("/AddMidia").patch(jwtVarify,AddMidia)

export default MidiaRouter