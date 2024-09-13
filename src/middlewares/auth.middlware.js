import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import {asyncHandel} from '../utils/asyncHandaler.js';
import jwt from 'jsonwebtoken';

export const jwtVarify = asyncHandel(async function (req,_,next) {
    // GET cookie 🍪👌
    // Check if the cookie is valid ✔️ 👌
    // Verify the cookie using JWT verify 🔍 👌
    // Decode the cookie 🔓👌
    // Extract the user from the decoded token 🧑‍💻👌
    // Request the database to get the user 🗄️👌
    // RETURN the user using res 📤👌

try {
        

        const cookie = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")
        if(!cookie){
            throw new ApiError(401,"cookie well not come")
        }   
        const decode = jwt.verify(cookie,process.env.ACCESS_TOKEN_PRIVAT)
        if(!decode){
            throw new ApiError(401,"verify fake JET Token Token will not exist")
        }
        const user = await User.findById(decode._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401,"user well not exist for this Token")
        }
        req.user = user
        next()
} catch (error) {
    throw new ApiError(402,error,"Token varification fail")
}
})