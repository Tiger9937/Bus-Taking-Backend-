import {Project} from '../../models/Student_features/Project.modle.js'
import {asyncHandel} from '../../utils/asyncHandaler.js'
import {Is_Image_Available} from '../../middlewares/IsFileavailable.js'
import {ApiError} from '../../utils/ApiError.js'
import {Apires} from '../../utils/Apires.js'

 

const addProject =asyncHandel((req,res)=>{
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
        goals,
        outcome,
        budget,
        comment,
        socialLinks
    } = req.body

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