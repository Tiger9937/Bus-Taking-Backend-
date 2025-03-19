import {Router} from 'express'
import {experiment} from '../controler/experiment.controler.js'


const exp = Router()

exp.route("/testing").post(experiment)

export default exp