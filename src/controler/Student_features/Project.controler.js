import {Project} from '../../models/Student_features/Project.modle.js'
import {asyncHandel} from '../../utils/asyncHandaler.js'
import {Is_Image_Available} from '../../middlewares/IsFileavailable.js'
import {ApiError} from '../../utils/ApiError.js'
import {Apires} from '../../utils/Apires.js'
import second from '../../models'
 

const addProject =asyncHandel(async(req,res)=>{

    const {title,
        owner,
        category,
        status,
        technologiesUsed,
        startDate,
        readme,
        endDate,
        teamMembers,
        totalmember,
        gole,
        outcome,
        budget,
        socialLinksid
    } = req.body
    if (!technologiesUsed && !teamMembers) {
        throw new ApiError(400, "All fields are required Create Project");
    }

    if ([title, owner, category, status, startDate, endDate, totalmember, gole,
        outcome , readme
    ].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required Create Project");
    }
    
    let thumbnailimage =await Is_Image_Available(req.files.thumbnail[0].path)
    
    const abstract_technologiesUsed_elements = technologiesUsed.map(tech=>({
        name:tech.name,
        img:tech.img,
        url: tech.url
    }))
    const project = await Project.create({
        title,
        category,
        status,
        startDate,
        readme,
        endDate,
        teamMembers,
        totalmember,
        totalmember,
        goal,
        outcome,
        budget,
        socialLinks:socialLinksid,
        thumbnail:thumbnailimage,
        technologiesUsed:abstract_technologiesUsed_elements
    })
    if (!project) {
        throw new ApiError(405,"Project is not created ")
    }
    res.status(200).json(new Apires(200,project,"Project Created Successfully"))
})
const removedProject =asyncHandel((req,res)=>{
    
})

const updateProject =asyncHandel((req,res)=>{

})

const DeleteSelected_Project =asyncHandel((req,res)=>{

})

const DeleteAllProjects =asyncHandel((req,res)=>{

})

const AccessAllProjects =asyncHandel((req,res)=>{

})
const Access_selected_Projects =asyncHandel((req,res)=>{
    
})


export {addProject,removedProject,updateProject,DeleteSelected_Project,DeleteAllProjects,AccessAllProjects,Access_selected_Projects}