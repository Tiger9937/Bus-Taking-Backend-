import {asyncHandel} from '../utils/asyncHandaler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {cloudinary_FUNCTION as UpLoader} from '../utils/cloudinary.js';
import {Apires} from '../utils/Apires.js';
const Regester_User = asyncHandel(async (req , res)=>{
       // GET details from frontent 👌
       // cheak the user is exist or not 👌
       // cheak the image is coming or not 👌
       // uplode avterimage in cludnary and get the image url 👌
       // creat user boject 👌
       // RETURN object of the user 👌
       // exclude sum attributes 👌

       const {usename,email,password,fullname} = req.body
       if ([usename,email,password,fullname].some((fild)=> fild?.trim() === "" )) {
              throw new ApiError(400,"all fild are requrit To sigin")
       }
       const exsting_user  = User.findOne({
              $or: [{usename},{email}]
       })
       if(exsting_user){
              throw new ApiError(409," user well have already exist")
       }
       const GetAvatarImage = req.file?.avatar[0]?.path
       console.log(GetAvatarImage);
       if (!GetAvatarImage) {
              throw new ApiError(409," file is not resived")
       }
       const imageURL=await UpLoader(GetAvatarImage)
       const user = await User.create({
              usename:usename.toLowerCase(),
              email,
              password,
              fullname,
              avatar: imageURL.url
       })
       const usercreated = await User.findById(user._id).select("-refreshToken")
       if(!usercreated){
              throw new ApiError(500," Somthing Wont Worng While Server Take Some Mistake ")
       }
       return res.status(201).json(
              new Apires(200,usercreated,"user creation successfull")
       )
       
       
})

export {Regester_User}
