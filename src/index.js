import connectDB from "./DB/index.js";
import dotenv from 'dotenv';
import {app} from './app.js';
dotenv.config({
    path:"./env"
})

let dotCount = 0
dotCount = (dotCount + 1) % 6
const dots = '.'.repeat(dotCount);

connectDB().then(
    app.listen(process.env.PORT || 3000,()=>{
        console.log( `server is starting , now run at port ${process.env.PORT || 3000}` ,dots)
    })
).catch(
    (err)=>{
        console.log("App is not responding i thing somthing is worngin your code",err)
    }
)