import {Project} from '../../models/Student_features/Project.modle.js'
import {asyncHandel} from '../../utils/asyncHandaler.js'
import {Is_Image_Available} from '../../middlewares/IsFileavailable.js'
import {ApiError} from '../../utils/ApiError.js'
import {Apires} from '../../utils/Apires.js'
import {stringTojson} from '../../middlewares/TypeConvertion.js'
 

const addProject =asyncHandel(async(req,res)=>{
    
    
    console.log(req.body)
    const {
        title, // string
        owner, // string
        category, // string
        status, // enum
        technologiesUsed, // array
        startDate, // Date
        readme, // string
        endDate, // date
        teamMembers, // array 
        totalmember, // numbers
        type,
        goal, // string
        outcome, // string
        budget, // number
        socialLinksid // id sting
    } = stringTojson(req)

    if (!technologiesUsed && !teamMembers && !totalmember) {
        throw new ApiError(400, "All fields are required Create Project");
    }

    if ([title, owner, category, status, startDate, goal,type,
        outcome , readme
    ].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required Create Project");
    }
    
    let thumbnailimage = await Is_Image_Available(req.files.thumbnail[0].path)
    
    const abstract_technologiesUsed_elements = technologiesUsed.map(tech=>({
        name:tech.name,
        img:tech.img,
        url: tech.url
    }))

    const project = await Project.create({
        title,
        owner,
        category,
        status,
        startDate,
        endDate,
        readme,
        teamMembers,
        totalmember,
        totalmember,
        goal,
        type,
        outcome,
        budget,
        socialLinks:socialLinksid,
        thumbnail:thumbnailimage.url,
        technologiesUsed:abstract_technologiesUsed_elements
    })
    if (!project) {
        throw new ApiError(405,"Project is not created ")
    }
    res.status(200).json(new Apires(200,project,"Project Created Successfully"))
})

const removedProject =asyncHandel(async(req,res)=>{
    const {projectID} = req.params

    if (!projectID) {
        throw new ApiError(400,"Id is requred to delete any project")
    }

    await Project.findByIdAndDelete(projectID)

    res.status(200).json({message:"Project delete successfull"})
})

const updateProject =asyncHandel(async(req,res)=>{
    
    const {projectID,...Updatedinformation} = req.body
    
    if (!projectID && !{...Updatedinformation}) {
        throw new ApiError(400, "All fields are required Update Project");
    }

    const updatedProject = await Project.findByIdAndUpdate(projectID,{
        ...Updatedinformation
    })

    res.status(200).json(new Apires(200,updatedProject,"Update successful"))
})

const DeleteAllProjects = asyncHandel(async(req,res)=>{
    const {owner} = req.params
    if (!owner) {
        throw new ApiError(400, "owner permission is requred to Delete All Project");
    }

    const deletedDocument = await Project.deleteMany({owner:owner})

    if (!deletedDocument) {
        throw new ApiError(400, "All documents are failing to delete");
    }

    res.status(200).json({message:`Totall ${deletedDocument.deletedCount} document hazbin deleted`})
})

export {addProject,removedProject,updateProject,DeleteAllProjects}