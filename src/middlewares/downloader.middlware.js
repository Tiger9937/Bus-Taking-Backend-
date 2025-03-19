
import fs from 'fs'
import path from 'path'
const __dirname = process.cwd()

const Imgdownloder = async(imgurl)=>{
    let folderPath = path.join(__dirname, 'public', 'temp');

    const response  = await fetch(imgurl)
    if (!response.ok) {
        console.log(`Failed to fetch image: ${response.statusText}`)
    }
    const buffer = await response.arrayBuffer()
    
    const filetype = response.headers.get('content-type')
    const flt = filetype.split('/')[1] || 'jpg';

    let fileName = path.basename(new URL(imgurl).pathname);
        if (!fileName || !fileName.includes('.')) {
            fileName = `${Date.now()}.${flt}`;
        }
    
    // Full file path
    const filePath = path.join(folderPath, fileName);

    // Save file asynchronously
    await fs.promises.writeFile(filePath, Buffer.from(buffer));

    return filePath;
}

export{Imgdownloder}