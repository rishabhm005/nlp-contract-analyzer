from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
from werkzeug.utils import secure_filename
import PyPDF2
from PIL import Image
import pytesseract
from pdf2image import convert_from_path
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Clause patterns
CLAUSE_PATTERNS = {
    'confidentiality': r'confidential(ity)?|non-disclosure|proprietary information',
    'governing_law': r'governing law|applicable law|law of',
    'jurisdiction': r'jurisdiction|venue|courts? of',
    'termination': r'termination|terminate|cancel(l)?ation',
    'assignment': r'assignment|assign|transfer of rights',
    'liability_cap': r'liability cap|limit(ation)? of liability|damages cap',
    'indemnity': r'indemnif(y|ication)|hold harmless',
    'ip_ownership': r'intellectual property|IP ownership|copyright',
    'payment_terms': r'payment|compensation|fees|pricing',
    'audit_rights': r'audit|inspection rights|right to examine',
    'data_protection': r'data protection|privacy|GDPR|personal data',
    'force_majeure': r'force majeure|act of god|circumstances beyond'
}

PLAYBOOK = {
    'confidentiality': {
        'preferred': 'The Receiving Party shall maintain all Confidential Information in strict confidence.',
        'red_flags': ['perpetual', 'no return obligation'],
        'required': ['definition', 'exclusions', 'return clause']
    },
    'liability_cap': {
        'preferred': 'Total liability shall not exceed fees paid in the 12 months preceding the claim.',
        'red_flags': ['unlimited liability', 'no cap'],
        'required': ['cap amount', 'exceptions']
    },
    'termination': {
        'preferred': 'Either party may terminate with 30 days written notice.',
        'red_flags': ['no notice period', 'no cure rights'],
        'required': ['notice period', 'cure period', 'survival']
    }
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_path):
    text = ""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n\n"
        
        if len(text.strip()) < 100:
            print("Text extraction failed, trying OCR...")
            images = convert_from_path(file_path)
            for image in images:
                text += pytesseract.image_to_string(image) + "\n\n"
    except Exception as e:
        print(f"PDF extraction error: {e}")
    return text

def extract_text_from_image(file_path):
    try:
        image = Image.open(file_path)
        text = pytesseract.image_to_string(image)
        return text
    except Exception as e:
        print(f"Image OCR error: {e}")
        return ""

def split_into_sections(text):
    sections = []
    current_section = []
    
    for line in text.split('\n'):
        if re.match(r'^\d+\.\s+[A-Z]', line) or (line.isupper() and len(line) > 3):
            if current_section:
                sections.append('\n'.join(current_section))
                current_section = []
        if line.strip():
            current_section.append(line)
    
    if current_section:
        sections.append('\n'.join(current_section))
    
    return sections if sections else [text]

def detect_clause_type(text):
    detected = []
    text_lower = text.lower()
    
    for clause_type, pattern in CLAUSE_PATTERNS.items():
        if re.search(pattern, text_lower, re.IGNORECASE):
            detected.append(clause_type)
    
    return detected

def calculate_confidence(text, clause_type):
    text_lower = text.lower()
    pattern = CLAUSE_PATTERNS.get(clause_type, '')
    
    matches = len(re.findall(pattern, text_lower, re.IGNORECASE))
    word_count = len(text.split())
    
    confidence = min(0.9, 0.5 + (matches * 0.15) + min(0.25, word_count / 200))
    
    return round(confidence, 2)

def compare_with_playbook(text, clause_type):
    if clause_type not in PLAYBOOK:
        return {
            'status': 'no_playbook',
            'score': 0.5,
            'red_flags': [],
            'missing': []
        }
    
    playbook = PLAYBOOK[clause_type]
    text_lower = text.lower()
    
    red_flags_found = []
    for flag in playbook['red_flags']:
        if flag.lower() in text_lower:
            red_flags_found.append(flag)
    
    missing_elements = []
    for required in playbook['required']:
        if required.lower() not in text_lower:
            missing_elements.append(required)
    
    score = 1.0
    score -= len(red_flags_found) * 0.2
    score -= len(missing_elements) * 0.15
    score = max(0.0, min(1.0, score))
    
    return {
        'status': 'compliant' if score >= 0.7 else 'needs_review',
        'score': round(score, 2),
        'red_flags': red_flags_found,
        'missing': missing_elements,
        'preferred': playbook['preferred']
    }

def extract_clauses(text):
    sections = split_into_sections(text)
    clauses = []
    
    for idx, section in enumerate(sections):
        detected_types = detect_clause_type(section)
        
        for clause_type in detected_types:
            confidence = calculate_confidence(section, clause_type)
            comparison = compare_with_playbook(section, clause_type)
            
            clause = {
                'id': len(clauses) + 1,
                'type': clause_type.replace('_', ' ').title(),
                'type_key': clause_type,
                'text': section[:500] + ('...' if len(section) > 500 else ''),
                'full_text': section,
                'confidence': confidence,
                'section_number': idx + 1,
                'comparison': comparison,
                'status': 'pending'
            }
            clauses.append(clause)
    
    return clauses

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed. Use PDF or images.'}), 400
    
    try:
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        saved_filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], saved_filename)
        file.save(filepath)
        
        file_ext = filename.rsplit('.', 1)[1].lower()
        if file_ext == 'pdf':
            text = extract_text_from_pdf(filepath)
        else:
            text = extract_text_from_image(filepath)
        
        if not text or len(text.strip()) < 50:
            return jsonify({'error': 'Could not extract text from document'}), 400
        
        clauses = extract_clauses(text)
        
        total_clauses = len(clauses)
        high_risk = sum(1 for c in clauses if len(c['comparison']['red_flags']) > 0)
        avg_confidence = sum(c['confidence'] for c in clauses) / total_clauses if total_clauses > 0 else 0
        
        return jsonify({
            'success': True,
            'filename': filename,
            'extracted_text_length': len(text),
            'total_clauses': total_clauses,
            'statistics': {
                'total': total_clauses,
                'high_risk': high_risk,
                'avg_confidence': round(avg_confidence, 2),
                'clause_types': len(set(c['type_key'] for c in clauses))
            },
            'clauses': clauses
        })
    
    except Exception as e:
        print(f"Error processing file: {e}")
        return jsonify({'error': f'Error processing file: {str(e)}'}), 500

if __name__ == '__main__':
    print("\n" + "="*50)
    print("Legal Contract Clause Extraction API")
    print("="*50)
    print("Server running on: http://localhost:5000")
    print("Health check: http://localhost:5000/api/health")
    print("="*50 + "\n")
    app.run(debug=True, host='0.0.0.0', port=5000)
