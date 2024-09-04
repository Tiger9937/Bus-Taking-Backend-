import { asyncHandel } from '../utils/asyncHandaler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { cloudinary_FUNCTION, cloudinary_FUNCTION as UpLoader } from '../utils/cloudinary.js';
import { Apires } from '../utils/Apires.js';
import {Delete_file} from '../utils/deletfileCludinary.js';

const generate_AccessToken_RefreshToken =async (userid)=>{
    try {
        const user = await User.findById(userid);
        console.log(user);

        const Access_Token = user.Genreat_Access_Token();
        const Refresh_Token = user.Genreat_Refresh_Token();

        user.refreshToken = Refresh_Token;
        await user.save({ validateBeforeSave: false });
        return { Access_Token, Refresh_Token };
    } catch (err) {
        console.log(err);
        throw new ApiError(401, "Token will not be generated");
    }
}

const Register_User = asyncHandel(async (req, res) => {
    // GET details from frontend 👌
    // Check if the user exists or not 👌
    // Check if the image is present or not 👌
    // Upload avatar image to Cloudinary and get the image URL 👌
    // Create user object 👌
    // RETURN the object of the user 👌
    // Exclude some attributes 👌

    const { usename, email, password, fullname } = req.body;
   

    if ([usename, email, password, fullname].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required to sign in");
    }
    
    const existing_user =await User.findOne({
        $or: [{ usename }, { email }]
    });
    
    if (existing_user) {
        throw new ApiError(409, "User already exists");
    }

    const GetAvatarImage = req.files?.avatar[0]?.path;
    console.log(GetAvatarImage);

    if (!GetAvatarImage) {
        throw new ApiError(400, "File not received");
    }

    const imageURL = await UpLoader(GetAvatarImage);
    const user = await User.create({
        usename: usename.toLowerCase(),
        email,
        password,
        fullname,
        avatar: imageURL.url
    });

    const userCreated = await User.findById(user._id).select("-refreshToken");

    if (!userCreated) {
        throw new ApiError(500, "Something went wrong while processing the request");
    }

    return res.status(201).json(
        new Apires(201, userCreated, "User creation successful")
    );
});

const Login_User = asyncHandel(async (req,res)=>{
    // GET data frome the user 👌
    // find the user using Findone methord 👌
    // genret the accessToken and Refress Token 
    // password cheak👌
    // send this Token in cookie
    // RETURN respons to login
    const {usename,email,password} = req.body
    if(!email && !usename){
        throw new ApiError(400,"All fields are required to login")
    }
    const Exuser =await User.findOne({$or:[{email},{usename}]})

    if(!Exuser){
        throw new ApiError(400,"user well not Register so first sing in than trying to login")
    }
    const validPassword =await Exuser.isPasswordCorrect(password)
    if(!validPassword){
        throw new ApiError(401,"your password well not correct")
    }

    const {Access_Token,Refresh_Token} = await generate_AccessToken_RefreshToken(Exuser._id)
    if(!Access_Token && !Refresh_Token){
        throw new ApiError(401,"Token well be not resived")
    }
     const Login_User =await User.findById(Exuser._id).select("-refreshToken -password")
    
    const options = {
        httpOnly : true, 
        secure : true
    }
    // res.status(200).cookie("refreshToken",options,Refresh_Token).cookie("accesstoken",options,Access_Token)
    // .json(new 
    // Apires({
    // 200, , ,  , 
    //})

    res.status(200)
    .cookie("accessToken", Access_Token, options)
    .cookie("refreshToken", Refresh_Token, options)
    .json(
        new Apires(200,{
            user:Login_User,
            Access_Token, 
            Refresh_Token
        }, "User verification successful")
    );
            
})

const Logout_User = asyncHandel(async (req,res)=>{
    // GET refress Token Thourgh cookie  frome the user
    // delete the user in our DB
    // RETURN logout success message 

    await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken: undefined
            }
        },{
            new: true
        }
    )
    const options = {
        httpOnly : true, 
        secure : true
    }


    res.status(200).clearCookie("accsessToken",options)
    res.status(200).clearCookie("refressToken",options)
    res.json(new Apires(200,{},"user logout"))
})
const UpDateAvatar_image = asyncHandel(async,async (req,res)=>{
    const filePath = req.file?.path 

    if (!filePath) {
        throw new ApiError(401,"file is not risivet at")
    }

    const Image_url = await cloudinary_FUNCTION(filePath)
    if (!Image_url) {
        throw new ApiError(401,"image url well not get")
    }

    const userforoldimage = await User.findById(req.user?._id)
    const Oldimage_path = userforoldimage.avatar
    const delete_file  = await Delete_file(Oldimage_path)
    console.log(delete_file);


    const user = await User.findByIdAndUpdate(req.user?._id,{
        $set:{
            avatar:Image_url.url
        }
    },{new:true}).select("-password -refreshToken")
    
    res.status(200)
    .json(
        new Apires(200,user, "User Profile Image update successful")
    );
    
})
const AccountDetails_Change = asyncHandel(async,async (req,res)=>{
    // GET Updateed Data from user
    // cheak the all 
    // RETURN Update info


    const {usename,email} = req.body
    if (!usename || !email) {
        throw new ApiError(401,"username and email are not found at")
    }
    const user = await User.findByIdAndUpdate(req.user?._id,{
        $set:{
            usename:usename,
            email:email
        }
    })
    res.status(200).json(
        new Apires(200,user,"Account Details Change SuccessFull")
    )
    
})
const Password_Change = asyncHandel(async(req,res)=>{
    // GET A new password 
    // cheak this password is coming or not
    // call user and get old password 
    // change the password to a new password 
    // use save before validation to ensuar that the only password well chenged
    // RETURN message
    const {password} = req.body
    if (!password) {
        throw new ApiError(401,"password well not resived")
    }
    const user = await User.findById(req.user?.id)
    const oldpassword = user.password 
    if (oldpassword) {
        throw new ApiError(401,"old password is not come")
    }
    const varifiedPasword = await user.isPasswordCorrect(oldpassword) // this well return true or false 
    if (!varifiedPasword) {
        throw new ApiError(401, "Old password is incorrect");
    }

    user.password = password
    await user.save({validateBeforeSave:false})
    res.status(200).json(200,{},"password change successfull")
})

export { Register_User,
            Login_User,
            Logout_User,
            UpDateAvatar_image,
            AccountDetails_Change,
            Password_Change
};