import mongoose from 'mongoose'
import {asyncHandel} from '../utils/asyncHandaler.js'
import {Comment} from '../models/comment.modle.js'
import {ApiError} from '../utils/ApiError.js'
import {Apires} from '../utils/Apires.js'
import { Student } from '../models/student.modle.js'

const CreateComment = asyncHandel(async (req,res)=>{
    const {ID,comment} = req.body

    if (!comment && !ID) {
        throw new ApiError(400,"All fild is requred")
    }
    if (!mongoose.Types.ObjectId.isValid(ID)) {
        throw new ApiError(402,"Invalid ID format.")
    }
    
    const StudentID = !!(await Student.exists({ _id: ID }))

    // throw new ApiError(250 , "Stop For Du To the debuging")

    const NewComment = await Comment.create({
        [StudentID ?  "studentId" : "collegeId"] : ID,
        comment
    })

    if (!NewComment) {
        throw new ApiError(404,"comment well not create")
    }

    res.status(200).json(new Apires(200,NewComment,"New comment Add suuccessfull"))

})

const removedComment = asyncHandel(async (req,res)=>{
    const {CommentID} = req.query
    console.log(CommentID)
    if (!CommentID) {
        throw new ApiError(400,"Comment Id is requred")
    }

    await Comment.findByIdAndDelete(CommentID)

    res.status(200).json(200,{message:"Comment delete successful"})
})

// TODO:: make this all comments in particular use case
// const AccessAllComments = asyncHandel(async ()=>{
      
// })

const AccessParticulaeComment = asyncHandel(async (req,res)=>{
    const {CommentID} = req.query
    if (!CommentID) {
        throw new ApiError("Comment Id is requred")
    }

    const comment = await Comment.findById(CommentID)

    if (!comment) {
        throw new ApiError("comment well not found")
    }

    res.status(200).json(new Apires(200,comment,"Get comment Successful"))
})

const UpdateParticularComment = asyncHandel(async (req,res)=>{
    const {CommentID,comment} = req.body
    if (!CommentID && !comment) {
        throw new ApiError("Comment Id is requred")
    }

    const updateComment = await Comment.findByIdAndUpdate(CommentID,{comment})

    if (!updateComment) {
        throw new ApiError(404,"Comment not update")
    }

    res.status(200).json(new Apires(200,updateComment,"Comment update SuccessFull"))
})

export { CreateComment , removedComment , AccessParticulaeComment , UpdateParticularComment }

