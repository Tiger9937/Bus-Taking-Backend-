import { asyncHandel } from '../utils/asyncHandaler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { cloudinary_FUNCTION as UpLoader } from '../utils/cloudinary.js';
import { Apires } from '../utils/Apires.js';

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

export { Register_User };
