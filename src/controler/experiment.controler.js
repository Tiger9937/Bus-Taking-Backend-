import { Row_pdfs } from '../middlewares/textmanager.middlware.js';
import { asyncHandel } from "../utils/asyncHandaler.js";
import { ApiError } from '../utils/ApiError.js';
import { Apires } from '../utils/Apires.js';
import {PDF_TO_TEXT} from '../utils/PDF_TO_TEXT.js'

const experiment = asyncHandel(async (req, res, next) => {
    try {
        const allcontents = await Row_pdfs();

        if (allcontents.length === 0) {
            throw new ApiError(402, "Folder is empty");
        }

        for (const content of allcontents) {
            await PDF_TO_TEXT(content)
        }

        res.status(200).json(new Apires(200, "All PDFs processed successfully"));
    } catch (error) {
        console.error("Error:", error);
        res.status(error.statusCode || 500).json(error instanceof ApiError ? error : new ApiError(500, error.message));
    }
});

export { experiment };