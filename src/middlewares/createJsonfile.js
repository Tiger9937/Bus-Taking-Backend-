import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const __dirname = process.cwd()

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

let filepath = path.join(__dirname,'public','temp', 'storedLinks.json')
const jsonfiles_In_temp =async (data)=>{

       try {

         await writeFile(filepath,JSON.stringify(data,null,2))

         const Getdata_infile =await readFile(filepath,'utf-8')

         return JSON.parse(Getdata_infile)

       } catch (error) {
        return error
       }
}

const Delete_jsonfiles_In_temp = async ()=>{
    fs.unlink(filepath,(error)=>{
      return error
    })
} 

export{jsonfiles_In_temp,Delete_jsonfiles_In_temp}