import mongoose from 'mongoose';
import {D_BName} from '../constants.js';

const connectDB = async ()=>{
    try {
      await mongoose.connect(`${process.env.MONGODBURI} / ${D_BName}`)
      console.log(" mongodb husband connected ")
    } catch (error) {
        console.log("Momngodb Conaction error",error)
        process.exit(1)
    }
}   


export default connectDB