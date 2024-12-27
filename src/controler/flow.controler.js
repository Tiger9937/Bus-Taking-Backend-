import {asyncHandel} from '../utils/asyncHandaler.js'
import {ApiError} from '../utils/ApiError.js'
import {Flowers} from '../models/flow.modle.js'
import {Apires} from '../utils/Apires.js'
import {Student} from '../models/student.modle.js'

const followStudent = asyncHandel(async (req , res)=>{
    const {flowstudentid , flowingstudentid} = req.body
    // which studentid send flow request variable name is (flowstudentid) i flow some one else
    // which studentid risived flow request variable name is (flowingstudentid) some one else flow me
    console.log(flowstudentid , flowingstudentid)

    if (!flowstudentid && !flowingstudentid) {
        throw new ApiError(400,"student ids are not coming")
    }

    const AllradyFrend = await Flowers.findOne({Flowers:flowstudentid , Flowing:flowingstudentid})

    if (AllradyFrend) {
        return res.status(400).json({ message: "You both are Frend " });
    }
    


    await Flowers.create({
        Flowers:flowstudentid,
        Flowing:flowingstudentid
    })

    // await floweInfo.deleteOne(Flowers._id)
    // await floweInfo.deleteOne(Flowers.__v)

    // throw new ApiError(250 , "Stop For Du To the debuging")

    await Student.findByIdAndUpdate(flowstudentid,{$inc:{flowsCount:1}})
    await Student.findByIdAndUpdate(flowingstudentid,{$inc:{flowingCount:1}})

    res.status(200).json({ message: "Successfully followed the user." });

})

const unfollowStudent = asyncHandel(async (req  ,res)=>{
    const {flowstudentid , flowingstudentid} = req.body

    if (!flowstudentid && !flowingstudentid) {
        throw new ApiError(400,"student ids are not coming")
    }

    await Flowers.findOneAndDelete({Flowers:flowstudentid , Flowing:flowingstudentid})

    await Student.findByIdAndUpdate(flowstudentid,{$inc:{flowstudentid:-1}})
    await Student.findByIdAndUpdate(flowingstudentid,{$inc:{flowingCount:-1}})

    res.status(200).json({ message: "Student Successfully unfollow" });
})

const getFollowers = asyncHandel(async (req , res)=>{
    // thougth flowing we get the flowers 
    // used to access all the flowes it means how many student are flowing that particular student 
    // NOTE::Allflower Data Access Thought Flowing info
    // what ever write hear ther opset thing is brn hapend our to get which which student flow the particular user

    const {flowingstudentid} = req.query
    

    if (!flowingstudentid) {
        throw new ApiError(400,"student id are not coming")
    }
   
    const AllFlowers = await Flowers.find({Flowers:flowingstudentid}).populate('Flowers')
    

    // throw new ApiError(250 , "Stop For Du To the debuging")
    res.status(200).json(new Apires(200,AllFlowers,"Get all flowers Successfully"))
})

const getFollowing = asyncHandel(async (req , res)=>{
    const {flowingstudentid} = req.query
    

    if (!flowingstudentid) {
        throw new ApiError(400,"student id are not coming")
    }

    const AllFlowers = await Flowers.find({Flowing:flowingstudentid}).populate('Flowing')

    res.status(200).json(new Apires(200,AllFlowers,"Get all flowers Successfully"))

})

const getCounts = asyncHandel(async (req , res)=>{
    const {flowingstudentid} = req.query

    if (!flowingstudentid) {
        throw new ApiError(400 , "flowingstudentid Well not coming")
    }

    const flowersCount = await Flowers.countDocuments({Flowers:flowingstudentid})
    const flowingCount = await Flowers.countDocuments({Flowing:flowingstudentid})


    // throw new ApiError(250 , "Stop For Du To the debuging")

    res.status(200).json(new Apires(200 ,{flowersCount , flowingCount},"flowers and flowing count"))

})


export {
    followStudent, unfollowStudent,getCounts,getFollowers,getFollowing
}