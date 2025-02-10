import {Project} from '../../../models/Student_features/Project.modle.js'
import { ApiError } from '../../../utils/ApiError.js'
import { Apires } from '../../../utils/Apires.js'
import { asyncHandel } from '../../../utils/asyncHandaler.js'

const AccessOneProject = asyncHandel(async(req,res)=>{
    const {Projectid} = req.params

    if (!Projectid) {
        throw new ApiError(400,"Projectid is is requred To access the Project")
    }

    const project = await Project.findById(Projectid)

    if (!project) {
        throw new ApiError(401,"project access denied")
    }

    res.status(200).json(new Apires(200, project ,"Project Send successfull"))
})

const Owner_AccessOneProject = asyncHandel(async(req,res)=>{
    const {Projectid} = req.params

    if (!Projectid) {
        throw new ApiError(400,"Projectid is is requred To access the Project")
    }

    const project =  await Project.findById(Projectid)

    if (!project) {
        throw new ApiError(401,"project access denied")
    }

    res.status(200).json(new Apires(200, project ,"Project Send successfull"))

})

const Owner_AccessAllProjects =  asyncHandel(async(req,res)=>{
    const {studentid} = req.params

    if (!studentid) {
        throw new ApiError(400,"studentis is requred to access All project")
    }

    const allProjects = await Project.find({owner:studentid})

    res.status(200).json(new Apires(200,allProjects,"send All projects"))
})

const AccessAllProjects = asyncHandel(async(req,res)=>{
    const {studentid} = req.params

    if (!studentid) {
        throw new ApiError(400,"studentis is requred to access All project")
    }

    const allProjects = await Project.find({owner:studentid})

    res.status(200).json(new Apires(200,allProjects,"send All projects"))
})

const Projectsorting = asyncHandel(async(req,res)=>{
    const {Datewise,Alpathbaticaly} = req.query
    var AllProjects = {};
    if (Datewise === 1 || Datewise === -1) {
        AllProjects = await Project.find().sort({ createdAt: Datewise });
    }else if(Alpathbaticaly){
        AllProjects = await Project.find().sort({ title:1 })
    }

    res.status(200).json(new Apires(200 , AllProjects ,"All Shorted Projects"))
})


export{AccessOneProject,AccessAllProjects,Owner_AccessOneProject,Owner_AccessAllProjects,Projectsorting}