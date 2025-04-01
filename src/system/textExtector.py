import fitz  # PyMuPDF
import json
import os
import argparse
import uuid
import sys  # Required for proper exit handling


def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file and return paragraphs."""
    try:
        doc = fitz.open(pdf_path)
        text = [page.get_text() for page in doc]
        paragraphs = [p.strip() for page in text for p in page.split("\n") if p.strip()]
        return paragraphs if paragraphs else None  # Return None if empty
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None


def save_text_to_json(paragraphs, output_dir):
    """Save extracted text to a JSON file with a unique name."""
    unique_id = uuid.uuid4().hex[:8]  # Short unique ID
    file_name = os.path.join(output_dir, f"{unique_id}.json")

    with open(file_name, "w", encoding="utf-8") as f:
        json.dump({"paragraphs": paragraphs}, f, ensure_ascii=False, indent=4)

    return file_name  # Return the saved filename


def main():
    """Main function to handle PDF processing."""
    __Workingdir = os.getcwd()
    output_Location = os.path.join(__Workingdir, 'public', 'temp', 'chankoutput')
    print("path:",output_Location)
    parser = argparse.ArgumentParser(description='Extract text from PDF and save as JSON')
    parser.add_argument('--path', required=True, help='Input path to PDF file')
    parser.add_argument('--output', default=output_Location, help='Output directory for JSON file')

    args = parser.parse_args()

    # Validate input file
    if not os.path.exists(args.path):
        print("Error: PDF file not found.")
        sys.exit(1)  # Exit with an error code

    os.makedirs(args.output, exist_ok=True)  # Ensure output directory exists

    # Extract text
    paragraphs = extract_text_from_pdf(args.path)

    if paragraphs is None:
        print("Warning: No text found in PDF.")
        sys.exit(2)  # Exit with a different code for "no text"

    # Save JSON and return the filename
    json_file = save_text_to_json(paragraphs, args.output)
    print(json_file)  # Print the filename, so Node.js can capture it


if __name__ == "__main__":
    main()
