import { asyncHandel } from '../utils/asyncHandaler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { cloudinary_FUNCTION, cloudinary_FUNCTION as UpLoader } from '../utils/cloudinary.js';
import { Apires } from '../utils/Apires.js';
import {Delete_file} from '../utils/deletfileCludinary.js';
import jwt from 'jsonwebtoken'
import  mongoose  from 'mongoose';
import {Pick_Random_Image} from '../utils/Random_image_piker.js'
import {Student} from '../models/student.modle.js'



const generate_AccessToken_RefreshToken = async (userid)=>{
    try {
        const user = await User.findById(userid);
        

        const Access_Token = user.Genreat_Access_Token();
        const Refresh_Token = user.Genreat_Refresh_Token();

        user.refreshToken = Refresh_Token;
        await user.save({ validateBeforeSave: false });
        return { Access_Token, Refresh_Token };
    } catch (err) {
        
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
        res.json(
            new Apires(200,"now log in to access the user","User already exists")
        )
        throw new ApiError(409, "User already exists");
    }
    // TODO:: Chenge the name as 'user_profile_image' to ''user_profile_images'
    const Avter = await Pick_Random_Image('user_profile_images')
    console.log(Avter)
    
     await User.create({
        usename,
        email,
        password,
        fullname,
        avatar: Avter
    });

    return res.status(201).json(
        new Apires(201,"now log in to access the user", "User creation successful")
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

    const Exuser = await User.findOne({$or:[{email},{usename}]})

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

const refreshAccessToken = asyncHandel(async (req,res)=>{
    // GET thought cookis access the Token
    // cheak the token is or not
    // varifiy the token
    // chake the varifivad token is match our upcoming token or not
    // bring the id of the user 
    // call the user thought the id
    // genreat a new Token 
    // RETURN Token 



    const incoming_refress_token = await req.cookies.refreshToken || req.body.refreshToken

    if(!incoming_refress_token){
        throw new ApiError(400,"refress Token is not comming")
    }

    const DecodedToken = jwt.verify(incoming_refress_token, process.env.REFRESH_TOKEN_PRIVAT)
    if (!DecodedToken) {
        throw new ApiError(401,"DecodedToken well not come")
    }
    
    
    const user = await User.findById(DecodedToken?._id)
    if (!user) {
        throw new ApiError(402,"user well not come")
    }
    
    
    if (incoming_refress_token !== user?.refreshToken) {
        throw new ApiError(401,"Token well not match")
    }
    
    const options = {
        httpOnly: true,
        secure: true
    }
    
    const {Access_Token, Refresh_Token} = await generate_AccessToken_RefreshToken(user?._id)
    return res.status(200)
    .cookie("accessToken", Access_Token, options)
    .cookie("refreshToken", Refresh_Token, options)
    .json(new Apires(200, {"Access_Token":Access_Token,"Refresh_Token":Refresh_Token}, "Access token refreshed"))
   
})

const Logout_User = asyncHandel(async (req,res)=>{
    // GET refress Token Thourgh cookie  frome the user
    // delete the user in our DB
    // RETURN logout success message 

    await User.findByIdAndUpdate(
        req.user._id,{
            $unset:{
                refreshToken: 1
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

const UpDateAvatar_image = asyncHandel(async (req,res)=>{
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

const AccountDetails_Change = asyncHandel(async (req,res)=>{
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

    if (!oldpassword) {
        throw new ApiError(401,"old password is not come")
    }
    

    const varifiedPasword =await user.isPasswordCorrect_toChange(oldpassword) // this well return true or false 
    
    
    if (!varifiedPasword) {
        throw new ApiError(401, "Old password is incorrect");
    }
    user.password = password
    await user.save({validateBeforeSave:false})
    res.status(200).json(new Apires(200,{},"password change Successful"))
})

const AccessUser = asyncHandel(async (req, res) => {
    const { usename } = req.params; // Ensure this is passed in the route

       // Access route parameter
       const username = req.params.username;
    
       // Access query parameters
       const queryParameters = req.query; // { key: value }
       
       // Access request headers
       const headers = req.headers; // { 'header-name': 'value' }
    // Check if username is provided
    if (!usename) {
        throw new ApiError(400, "Username is not provided");
    }

    // Find user in the database
    const user = await User.findOne({ usename: usename });
     

    // Check if user exists
    if (!user) {
        throw new ApiError(401, "Invalid username");
    }

    // user flowers Info

    // Check whether the user is registered as a student
    const studentName = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id),
               
            }
        },
        {
            $lookup: {
                from: "Students",
                localField: "_id",
                foreignField: "_id",
                as: "Student",
                pipeline: [
                    {
                        $lookup: {
                            from: "Users",
                            localField: "_id",
                            foreignField: "_id", 
                            as: "UserName"
                        }
                    }
                ]
            }
        },
        {
            $project: {
                "UserName.usename": 1,
            }
        }
    ]);
    
    

    if (!studentName || studentName.length === 0) {
        throw new ApiError(401, "Student data is not available");
    }

   
    let isUserStudent = false; 

    if (studentName[0].UserName && studentName[0].UserName.length > 0) {
        
        isUserStudent = studentName[0].UserName[0].usename === usename;
    }

    res.status(200).json(
        new Apires(200, { user, isUserStudent }, "User sent successfully")
    );
});

const SearchUser = asyncHandel(async (req, res) => {
    const { searchWord } = req.query; // Get the search keyword from query parameters

    if (!searchWord) {
        throw new ApiError(400, "Search word is required");
    }

    // Step 1: Search Users Based on Name or Full Name
    const users = await User.find({
        $or: [
            { name: { $regex: searchWord, $options: "i" } },
            { fullname: { $regex: searchWord, $options: "i" } }
        ]
    }).select('-refreshToken -createdAt -updatedAt -password -__v'); 

    if (users.length === 0) {
        return res.status(200).json(new Apires(200, [], "No users found"));
    }
    
    const userIds = users.map(user => user._id);
    

    const studentUsers = await Student.find({ user: { $in: userIds } }).select("user");
    const studentUserIds = new Set(studentUsers.map(student => student.user.toString())); 

    const usersWithRole = users.map(user => ({
        ...user._doc,
        role: studentUserIds.has(user._id.toString()) ? "student" : "user" 
    }));
    

    res.status(200).json(new Apires(200, usersWithRole, "All available users"));
});


export { 
            Register_User,
            Login_User,
            Logout_User,
            refreshAccessToken,
            UpDateAvatar_image,
            AccountDetails_Change,
            Password_Change,
            AccessUser,
            SearchUser
};