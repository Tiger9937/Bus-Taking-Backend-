import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


const cloudinary_FUNCTION = async (Local_File_Path)=>{

    try {
        
        if(!Local_File_Path){return null}
        // Configuration
        cloudinary.config({ 
            cloud_name: `${process.env.CLOUD_NAME}`, 
            api_key: `${process.env.API_KEY}`, 
            api_secret: `${process.env.API_SECRET}` 
        });
        //Upload an file
                const fileRSPOS = await cloudinary.uploader.upload(Local_File_Path,{
                resource_type: 'auto',folder : "user profile image"
            }) 
            setTimeout(()=>{
                fs.unlinkSync(Local_File_Path);
            }, 2000);
            return fileRSPOS

    } catch (error) {
            fs.unlink(Local_File_Path)
            return null
    }
} 
export{cloudinary_FUNCTION}
