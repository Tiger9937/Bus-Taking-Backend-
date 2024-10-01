import {Router} from 'express'
import {
    studentRegister,
    StudentProfile
} from '../controler/Student.controler.js'
import {jwtVarify} from '../middlewares/auth.middlware.js';

const StudentRout = Router()

StudentRout.route("/studentRigster").post(jwtVarify,studentRegister);
StudentRout.route("/c/:_ID").get(jwtVarify,StudentProfile);

export default StudentRout