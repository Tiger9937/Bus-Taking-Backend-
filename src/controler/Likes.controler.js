
import {ApiError} from '../utils/ApiError.js'
import {Like} from '../models/favorite.modle.js'
import {asyncHandel} from '../utils/asyncHandaler.js'
import { Apires } from '../utils/Apires.js'

const createLike = asyncHandel(async (req,res)=>{
    const {userid,...productID} = req.body

    if (!userid && !{...productID}) {
        throw new ApiError(400,"All fields are required")
    }

    const liked = await Like.create({
      Like:userid,
      ...productID
    })

    if (!liked) {
        throw new ApiError(400,"Like unsuccessful")
    }

    res.status(201).json({ message: `User like ${Object.keys(productID)}`});
})

const get_product_Like =asyncHandel(async(req,res) =>{
    const {...productID} = req.query

    if (!{...productID}) {
        throw new ApiError(401,"filds are requred")
    }

    const TotalLikes = await Like.countDocuments({...productID})

    res.status(201).json(new Apires(200,TotalLikes,`Get total Likes for the${Object.keys(productID)[0]}`));
})

const createDislike = asyncHandel(async(req,res)=>{
    const {userid,...productID} = req.body

    if (!userid && !{...productID}) {
        throw new ApiError(400,"All fields are required")
    }

    await Like.findOneAndDelete({
        Like:userid
    })
    

    const Disliked = Like.create({
        Dislike:userid,
        ...productID
    })

    if (!Disliked) {
        throw new ApiError(400,"DisLiked unsuccessful")
    }

    res.status(201).json({ message: `User DisLike ${Object.keys(productID)}`});
})

const get_product_disLike = asyncHandel(async (req,res)=>{
    const {...productID} = req.query
    if (!{...productID}) {
        throw new ApiError(400,"fields are required")
    }

    const TotalDisLikes = await Like.countDocuments({...productID})
    console.log(TotalDisLikes)

    res.status(201).json(new Apires(200, TotalDisLikes , `Total Dislike Count for ${productID}`));

})

export{ createLike, get_product_Like , createDislike , get_product_disLike }