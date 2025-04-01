import path from 'path'
import fs from 'fs'
const Row_pdfs = async ()=>{
    
    const __WorkingDIR = process.cwd()
    const folderPath = path.join(__WorkingDIR,"public/temp/chank")
  

    try {
        const files = await fs.promises.readdir(folderPath);
        if (files.length === 0) {
          return [];
        }
        return files; // Now you can return the list of files
      } catch (err) {
        console.error("Error reading directory:", err);
        return [];
      }
}

export{ Row_pdfs }

