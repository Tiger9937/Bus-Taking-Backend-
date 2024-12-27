import {asyncHandel} from '../utils/asyncHandaler.js'
import {Comment} from '../models/comment.modle.js'
import {ApiError} from '../utils/ApiError.js'
import {Apires} from '../utils/Apires.js'
import { Student } from '../models/student.modle.js'

const CreateComment = asyncHandel(async (req,res)=>{
    const {ID,comment} = req.post
    if (!comment && !ID) {
        throw new ApiError("All fild is requred")
    }

    const StudentID = Student.exists(ID)

    const NewComment = await Comment.create({
        [StudentID ? "studentId" : "collegeId"] : ID,
        comment
    })

    if (!NewComment) {
        throw new ApiError(404,"comment well not create")
    }

    res.status(200).json(new Apires(200,NewComment,"New comment Add suuccessfull"))

})

const removedComment = asyncHandel(async (req,res)=>{
    const {CommentID} = req.params
    if (!CommentID) {
        throw new ApiError("Comment Id is requred")
    }

    await Comment.findByIdAndDelete(CommentID)

    res.status(200).json(200,{message:"Comment delete successful"})
})

// TODO:: make this all comments in particular use case
// const AccessAllComments = asyncHandel(async ()=>{
      
// })

const AccessParticulaeComment = asyncHandel(async ()=>{
    const {CommentID} = req.params
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

    res.status(200).json(200,updateComment,"Comment update SuccessFull")
})

export { CreateComment , removedComment , AccessParticulaeComment , UpdateParticularComment }

