import {Project} from '../../../models/Student_features/Project.modle.js'
import { ApiError } from '../../../utils/ApiError.js'
import { Apires } from '../../../utils/Apires.js'
import { asyncHandel } from '../../../utils/asyncHandaler.js'

const SearchProjet_project = asyncHandel(async(req,res)=>{
    const {searched_Title} = req.query

    if (!search_Word) {
        throw new ApiError(400 ,"Word is requred to search the word")
    }

    const project = await Project.find({
        title:{ $regex: searched_Title, $options: "i" }
    })

    res.status(200).json(new Apires(200,project,"Project send"))
})

const SearchProjet_thought_Wordquery = asyncHandel(async(req,res)=>{
    const { search_Word } = req.query
    
    const project = await Project.find({
        $or: [
            {title:{ $regex: search_Word , $options: "i" }},
            {title:{ $regex: search_Word , $options: "i" }}
        ]
    })

    res.status(200).json(new Apires(200,project,"Project send"))
})

export {
    SearchProjet_project,
    SearchProjet_thought_Wordquery
}