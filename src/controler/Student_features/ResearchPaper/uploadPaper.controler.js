import fs from 'fs';

const uploadPaper = async (pdf_path) => {
    try {
        // Read the PDF file as a binary buffer
        const data = fs.readFileSync(pdf_path);

        // Convert binary PDF to a string
        const pdfContent = data.toString("latin1"); // PDFs use Latin-1 encoding

        // Find all page-related markers (like "Page1", "Page2") if available
        const pageMatches = pdfContent.split(/\/Page\b/g); // Splitting based on page markers

        let structuredData = {};

        pageMatches.forEach((pageContent, index) => {
            if (index === 0) return; // Skip pre-page metadata

            // Extract text from this page
            const textMatches = pageContent.match(/\((.*?)\)/g); // Extract text inside parentheses
            let extractedText = textMatches
                ? textMatches.map(t => t.replace(/\(|\)/g, "")).join(" ")
                : "";

            structuredData[`page${index}`] = { content: extractedText };
        });

        // Write structured data to a JSON file
        fs.writeFileSync("./structured_output.json", JSON.stringify(structuredData, null, 2));

        console.log("Extracted Text:", structuredData);
        return structuredData;

    } catch (err) {
        console.error("Error reading PDF:", err);
    }
};



export { uploadPaper };
