import {Router} from 'express'
import {FacultyRigster,FacultyProfile,UpdateFacultyProfile} from '../controler/Faculty.controler.js'
import { upload } from '../middlewares/multer.middlewares.js'

const Facultyroute = Router()


Facultyroute.route("/FacultyRigster").post(upload.fields(
    [
        {
            name: "profile_image",
            maxCount:1
        }
    ]
),FacultyRigster);

Facultyroute.route("/AccessFaculty").get(FacultyProfile)

Facultyroute.route("UpdateFaculty").patch(UpdateFacultyProfile)

export default Facultyroute