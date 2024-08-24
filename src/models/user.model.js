import mongoose ,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new Schema({
        usename:{
            type : String,
            required: true,
            unique : true,
            lowercase : true,
            trem: true,
            index : true
        },   
        email:{
            type : String,
            required: true,
            unique : true,
            lowercase : true,
            trem: true,
        },   
        password:{
            type : String,
            required: [true,'possword is required']
        },
        fullname:{
            type : String,
            required: true,
            lowercase : true,
            trem: true,
        },   
        avatar:{
            type: String,
            require: true
        },
        refreshToken:{
            type : String
        }
},{timestamps:true}
)
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) {return next()}
    this.password =await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password) // return true or false
}
userSchema.methods.Genreat_Access_Token = function () {
    return jwt.sign({
        _id: this._id,
        fullname: this.fullname,
        email: this.email,
    }, process.env.ACCESS_TOKEN_PRIVAT, {
        expiresIn: process.env.ACCESS_TOKEN_EXPDATE,
    });
};

userSchema.methods.Genreat_Refresh_Token = function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_PRIVAT, {
        expiresIn: process.env.REFRESH_TOKEN_EXPDATE,
    });
};
export const User = mongoose.model("User",userSchema)