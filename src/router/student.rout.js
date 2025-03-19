import {Router} from 'express'
import {
    studentRegister,
    StudentProfile,
    UpdateStudentProfile,
    Searchstudent
} from '../controler/Student.controler.js'
import {jwtVarify} from '../middlewares/auth.middlware.js';

const StudentRout = Router()

StudentRout.route("/studentRigster").post(jwtVarify,studentRegister);
StudentRout.route("/UpdateStudentProfile").patch(jwtVarify,UpdateStudentProfile)

StudentRout.route("/c/:_ID").get(jwtVarify,StudentProfile);
StudentRout.route("/c/u/:username").get(jwtVarify,StudentProfile);
StudentRout.route("/c/f/:fullname").get(jwtVarify,StudentProfile);
StudentRout.route('/c').get(jwtVarify,Searchstudent)

export default StudentRout