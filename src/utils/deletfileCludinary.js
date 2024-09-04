import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: `${process.env.API_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});
Delete_file =async (filepath)=>{
cloudinary.api.delete_resources(filepath,function(result) {
    console.log(result);
});
}
export {Delete_file}