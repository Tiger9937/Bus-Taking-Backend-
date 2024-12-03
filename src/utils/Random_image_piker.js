import {v2 as cloudinary} from 'cloudinary'

const Pick_Random_Image =async (FolderName)=>{
    
        try {
            cloudinary.config({ 
                cloud_name: `${process.env.CLOUD_NAME}`, 
                api_key: `${process.env.API_KEY}`, 
                api_secret: `${process.env.API_SECRET}` 
            });

            const folderName = `${FolderName}`
            const subFoldersResult = await cloudinary.api.sub_folders(folderName);
            
         
          const resourcesResult = await cloudinary.api.resources({
            type: 'upload',
            resource_type: 'image',
            prefix: subFoldersResult.folders,
            max_results: 100
          });

        
          const Image = resourcesResult?.resources[Math.floor(Math.random()*8)*1]
          
          return Image
      
        } catch (error) {
          console.log('Error:', error.message);
        }
      
}

export {Pick_Random_Image}