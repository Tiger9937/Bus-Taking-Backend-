// this only for helping to making tectstack 
import {Is_Image_Available} from '../middlewares/IsFileavailable.js'
import {Imgdownloder} from '../middlewares/downloader.middlware.js'
import fs from 'fs'
import { ApiError } from '../utils/ApiError.js'
import {technology} from '../models/technologyinfo.modle.js'

const techmaker = async(filepath,domain,name)=>{
    

    try {
        // downlood the image if is on the web
        let filelocalpath = "" 
        // https://api.logo.dev/search?q=goole

        if (filepath.slice(0,4) == 'http') {
            filelocalpath = await Imgdownloder(filepath)
        }else{
            filelocalpath = filepath
        }

        if (!filelocalpath) {
            throw new ApiError(400,`filelocal path was deleted`)
        }
        // upload the image
        const imgurl = await Is_Image_Available(filelocalpath)
        if (!imgurl) {
            
            fs.unlink('filelocalpath', (err) => {
                if (err) {
                    throw new ApiError(400,`${filelocalpath} was deleted`)
                }
            });
        }
        
        const tech = await technology.create({
            name:name,
            Domen_name:domain,
            Image:imgurl.url
        })

        if (!tech) {
            throw new ApiError(401,"tech is not creted")
        }

        return tech._id
    } catch (error) {
        throw new ApiError(400,error)
    }


}
export { techmaker}
