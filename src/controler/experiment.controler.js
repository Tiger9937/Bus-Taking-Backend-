import { asyncHandel } from "../utils/asyncHandaler.js";
import {techmaker} from '../system/techstackmaker.system.js'

const experiment = asyncHandel(async(req,res)=>{
    const {imgurl, domain, name} = req.body

    const ouput = await techmaker(imgurl,domain,name)
    console.log(ouput)

})

export{experiment}