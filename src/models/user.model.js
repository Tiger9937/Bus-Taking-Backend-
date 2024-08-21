import mongoose ,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
        usename:{
            type : String,
            required: true,
            unique : true,
            lowercase : true,
            trem: true,
            index : true
        },   
        to:{
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
        genrateToken:{
            type : String
        },
        refreshToken:{
            type : String
        }
},{timestamps:true}
)
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) {return next()}
    this.password = bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}
export const User = mongoose.model("User",userSchema)