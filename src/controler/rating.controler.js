import {Rating} from '../models/rating.modle.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandel } from '../utils/asyncHandaler.js'


const Addrating = asyncHandel(async(req,res)=>{
    const {...productid} = req.body

    if (!{...productid}) {
        throw new ApiError(401,"requred productid to rate product")
    }

    const Product_Rating = await Rating.create({
        user:req.user?.id,
        ...productid
    })

    res.status(200).json(new Apires(200,Product_Rating,"user reate"))
})

const ratingupdate = asyncHandel(async(req,res)=>{
    const {updaterating,...productid} = req.body
    if (!{...productid} , updaterating) {
        throw new ApiError(401,"requred productid to updaterate product")
    }
    const updatedrating =  await Rating.findOneAndUpdate({
        ...productid,
        rating:updaterating
    })

    if (!updatedrating) {
        throw new ApiError(400,"puoduct well not update")
    }

    res.status(200).json(new Apires(200,updatedrating,"user updatereate"))
})

const AvrageRading = asyncHandel(async ()=>{
    const {...productid} = req.body

    const AllRating =await Rating.find({...productid})

    let totalratingcount = 0

    AllRating.forEach((Data)=>{
        totalratingcount += Data.rating
    })

    let averageRading = totalratingcount/AllRating.length

    res.status(200).json(new Apires(200,averageRading,"Average Rating"))
})

const removedrating = asyncHandel(async()=>{
    const {...productid} = req.body
    if (!{...productid} , updaterating) {
        throw new ApiError(401,"requred productid to updaterate product")
    }

    await Rating.findOneAndDelete({
        ...productid,
    })

    res.status(200).json(200,"rating Remove Successfull")
})

export {Addrating , AvrageRading , ratingupdate , removedrating }