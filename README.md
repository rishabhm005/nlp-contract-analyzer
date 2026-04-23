# NLP Contract Analyzer

A full-stack web application that extracts key clauses from legal contracts and analyzes them against predefined legal playbooks. The system supports PDF and image uploads, performs OCR for scanned files, detects important clause types, assigns confidence scores, and flags risky or missing terms.

Built as a collaborative academic project and refined as a portfolio-ready standalone version.

---

## Features

* Upload contract files in PDF, PNG, JPG, JPEG formats
* Text extraction using:

  * Native PDF parsing for text-based PDFs
  * OCR for scanned PDFs and images
* Automatic clause detection for common legal clauses such as:

  * Confidentiality
  * Termination
  * Liability Cap
  * Payment Terms
  * IP Ownership
  * Governing Law
  * Jurisdiction
  * Indemnity
* Confidence scoring for detected clauses
* Red-flag detection for risky language
* Missing clause identification
* Clean React interface for upload and results display

---

## Tech Stack

### Frontend

* React
* JavaScript
* HTML
* CSS

### Backend

* Python
* Flask
* REST API

### NLP / Processing

* Regex-based clause extraction
* PyPDF2
* Tesseract OCR
* pdf2image
* Pillow

---

## Project Structure

NLP_PROJECT/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── uploads/

├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── App.css

├── README.md
└── Project_Report.pdf

---

## How It Works

1. Upload a contract document
2. Extract raw text using parser / OCR
3. Segment content into logical sections
4. Detect clauses using NLP patterns
5. Score confidence and compliance
6. Display results in dashboard UI

---

## My Contributions

* Backend logic integration
* Clause detection improvements
* Frontend enhancements
* Testing and debugging
* Documentation and deployment

---

## Setup Instructions

### Backend

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

Runs on:
[http://localhost:5000](http://localhost:5000)

### Frontend

cd frontend
npm install
npm start

Runs on:
[http://localhost:3000](http://localhost:3000)

---

## Usage

1. Open the frontend in browser
2. Upload a PDF or image contract
3. Click analyze
4. Review extracted clauses, risks, and scores

---

## Future Improvements

* Transformer / BERT-based clause classification
* Better legal risk scoring
* Export reports as PDF / CSV
* Multi-document comparison
* Admin dashboard

---

## Project Status

* ✅ End-to-end pipeline working
* ✅ Supports multiple file formats
* ✅ Ready for demonstration
* 🔜 Planned ML upgrades

---

## Repository

[https://github.com/rishabhm005/nlp-contract-analyzer](https://github.com/rishabhm005/nlp-contract-analyzer)
