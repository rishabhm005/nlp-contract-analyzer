# Automated Legal Contract Clause Extraction and Analysis

This project is a full‑stack web application that automatically extracts key clauses from legal contracts and analyzes them against predefined legal playbooks. It supports PDF and image uploads, performs text extraction (including OCR for scanned documents), detects 12+ clause types, assigns confidence scores, and flags potential risks (red flags, missing elements). The UI is intentionally simple and student‑friendly but demonstrates an end‑to‑end real‑world legal NLP system.

---

## Features

- Upload contract documents in **PDF, PNG, JPG, JPEG** (up to 50 MB)
- Text extraction using:
  - Native PDF parsing for text‑based PDFs
  - OCR for scanned PDFs and images
- Document segmentation into logical sections (headings, numbered clauses)
- Rule‑based detection of common legal clauses, e.g.:
  - Confidentiality, Termination, Liability Cap, IP Ownership, Payment Terms
  - Data Protection, Governing Law, Jurisdiction, Assignment, Indemnity, etc.
- Confidence scoring for each detected clause
- Playbook‑based compliance scoring:
  - Required elements check
  - Red‑flag detection (e.g. unlimited liability, perpetual confidentiality)
- Clean React UI:
  - Home page with project overview
  - Upload page with drag‑and‑drop support
  - Results dashboard with statistics and expandable clause cards

---

## Tech Stack

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Python, Flask, REST API
- **NLP / Processing:** Regex‑based clause patterns, PyPDF2, Tesseract OCR, pdf2image, Pillow
- **Environment:** Node.js/npm for frontend, Python 3.x + virtualenv for backend

Project structure:

legal-contract-app/
├── backend/
│ ├── app.py
│ ├── requirements.txt
│ └── uploads/ # created automatically, not committed
└── frontend/
├── package.json
├── public/
│ └── index.html
└── src/
├── index.js
├── index.css
├── App.js
├── App.css
└── components/
├── HomePage.js
├── HomePage.css
├── UploadPage.js
├── UploadPage.css
├── ResultsDisplay.js
└── ResultsDisplay.css


---

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

If you are starting fresh, create the folder `legal-contract-app` as the repo root and place `backend/` and `frontend/` inside it.

---

### 2. Backend Setup (Flask)

cd backend

Create virtual environment
python -m venv venv

Activate virtual environment
macOS / Linux:
source venv/bin/activate

Windows (PowerShell):
venv\Scripts\Activate.ps1
Install Python dependencies
pip install -r requirements.txt

#### System Dependencies

You may need to install these once on your machine:

- **Tesseract OCR**
  - macOS (Homebrew): `brew install tesseract`
  - Ubuntu: `sudo apt-get install tesseract-ocr`
- **Poppler** (for pdf2image)
  - macOS: `brew install poppler`
  - Ubuntu: `sudo apt-get install poppler-utils`

#### Run Backend

cd backend
source venv/bin/activate # if not already active
python app.py

Backend runs at:

- API base: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

Keep this terminal open while using the app.

---

### 3. Frontend Setup (React)

Open a **new terminal**:

cd frontend

Install Node.js dependencies (only first time)
npm install

Start development server
npm start

Frontend runs at:

- `http://localhost:3000`

Once both backend and frontend are running, open the browser at `http://localhost:3000`.

---

## Usage

1. Open `http://localhost:3000`.
2. Go to **“Upload & Analyze”**.
3. Drag and drop a contract PDF or image, or click to browse.
4. Click **“Analyze Document”**.
5. Wait for processing (2–5 seconds for typical documents).
6. View:
   - Total clauses found
   - Number of red flags
   - Average confidence
   - Clause‑type distribution
   - Individual clause cards with:
     - Clause text
     - Confidence score
     - Compliance score
     - Red flags and missing elements

---

## Development Notes

- Clause detection is **rule‑based** (regex patterns), not ML:
  - Easy to read and modify patterns in `app.py`.
  - Good baseline for future ML/LLM upgrades.
- Playbooks encode “good vs bad” clause patterns:
  - Adjust red‑flag phrases and required elements to match your legal guidelines.
- UI is intentionally simple to reflect a student project:
  - Easy to extend with more pages, filters, or editing features.

---

## How to Extend

- Add new clause types by:
  - Updating `CLAUSE_PATTERNS` in `backend/app.py`
  - Extending `PLAYBOOK` entries for each clause
- Add ML/LLM models (future work):
  - Replace or augment regex with classifier models
  - Add endpoints that call external LLM APIs
- Add export features:
  - Export clause results as CSV/JSON for research/annotation

---

## Project Status

- ✅ End‑to‑end pipeline working (upload → extract → analyze → display)
- ✅ Tested on multiple contract types and formats
- ✅ Documentation and PPT/report prepared for academic evaluation
- 🔜 Planned: ML upgrade, dataset benchmarking, publication


