import { exec } from 'child_process';
import path from 'path';
import util from 'util';

const execPromise = util.promisify(exec);

async function PDF_TO_TEXT(PdfFilename) {
        const __Workingdir = process.cwd();
        const textExtractor = path.resolve(__Workingdir, 'src/system/textExtector.py');

        
        const contentLocation = path.resolve(__Workingdir, 'public/temp/chank/', PdfFilename);
        
        const command = `python "${textExtractor}" --path "${contentLocation}"`;   
        
        await execPromise(command);             
}


export { PDF_TO_TEXT };
