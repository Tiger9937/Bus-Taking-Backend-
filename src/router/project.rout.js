import {Router} from 'express'
import {addProject,
    removedProject,
    updateProject,
    DeleteSelected_Project,
    DeleteAllProjects,
    AccessAllProjects,Access_selected_Projects} from '../controler/Student_features/Project.controler.js'
import {upload} from '../middlewares/multer.middlewares.js'
import {jwtVarify} from '../middlewares/auth.middlware.js'

const Projectrout = Router()


Projectrout.route("/addProject").post(jwtVarify,upload.fields([
    {
        name:"thumbnail",
        maxCount:1
    }
]),addProject)

Projectrout.route("/removedProject").get(jwtVarify,removedProject)
Projectrout.route("/updateProject").patch(jwtVarify,updateProject)
Projectrout.route("/DeleteSelected_Project").post(jwtVarify,DeleteSelected_Project)
Projectrout.route("/DeleteAllProjects").post(jwtVarify,DeleteAllProjects)
Projectrout.route("/AccessAllProjects").get(jwtVarify,AccessAllProjects)
Projectrout.route("/Access_selected_Projects").get(jwtVarify,Access_selected_Projects)



export default Projectrout