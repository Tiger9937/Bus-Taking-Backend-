import {Router} from 'express'
import {addProject,
    removedProject,
    updateProject,
    DeleteAllProjects,
} from '../controler/Student_features/project/Project.controler.js'

import {
    AccessOneProject,
    AccessAllProjects,
    Owner_AccessOneProject,
    Owner_AccessAllProjects,
    Projectsorting
} from '../controler/Student_features/project/Project.access.controler.js'

import {
    SearchProjet_project,
    SearchProjet_thought_Wordquery
} from '../controler/Student_features/project/Project.interaction.controler.js'


import {upload} from '../middlewares/multer.middlewares.js'
import {jwtVarify} from '../middlewares/auth.middlware.js'

const Projectrout = Router()


Projectrout.route("/addProject").post(jwtVarify,upload.fields([
    {
        name:"thumbnail",
        maxCount:1
    }
]),addProject)

Projectrout.route("/removedProject/:projectID").get(jwtVarify,removedProject)
Projectrout.route("/updateProject").patch(jwtVarify,updateProject)
Projectrout.route("/DeleteAllProjects/:ownerID").get(jwtVarify,DeleteAllProjects)
Projectrout.route("/DeleteProject/:projectID").get(jwtVarify,removedProject)

Projectrout.route("/Owner_AccessOneProject/:Projectid").get(jwtVarify,Owner_AccessOneProject)
Projectrout.route("/AccessOneProject/:Projectid").get(AccessOneProject)

Projectrout.route("/Owner_AccessAllProjects/:studentid").get(jwtVarify,Owner_AccessAllProjects)
Projectrout.route("/AccessAllProjects/:studentid").get(AccessAllProjects)


Projectrout.route("/Projectsorting").get(Projectsorting)

Projectrout.route("/SearchProjet_project").get(SearchProjet_project)
Projectrout.route("/SearchProjet_thought_Wordquery").get(SearchProjet_thought_Wordquery)

export default Projectrout