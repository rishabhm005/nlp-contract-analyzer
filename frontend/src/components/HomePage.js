import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            AI-Powered Legal Contract
            <br />
            <span className="gradient-text">Clause Analysis</span>
          </h1>
          <p className="hero-description">
            Upload your contracts and let AI extract, analyze, and compare clauses
            against industry standards in seconds. Powered by advanced NLP technology.
          </p>
          <Link to="/upload" className="cta-button">
            <span>Start Analyzing</span>
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Powerful Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="feature-title">Smart Extraction</h3>
            <p className="feature-description">
              Automatically identify and extract 12+ clause types from contracts including
              confidentiality, termination, liability, and more.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="feature-title">Multi-Format Support</h3>
            <p className="feature-description">
              Upload PDFs or images. Built-in OCR technology extracts text from
              scanned documents with high accuracy.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="feature-title">Compliance Check</h3>
            <p className="feature-description">
              Compare clauses against legal playbooks, detect red flags, and identify
              missing required elements automatically.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon orange">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">
              Process contracts in seconds, not hours. Get instant results with
              confidence scores for each detected clause.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon pink">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="feature-title">Secure & Private</h3>
            <p className="feature-description">
              Your documents are processed securely. All data is encrypted and
              handled with strict confidentiality.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon teal">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="feature-title">Detailed Analytics</h3>
            <p className="feature-description">
              Get comprehensive insights with confidence scores, risk levels, and
              detailed comparison reports.
            </p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Ready to analyze your contracts?</h2>
        <p className="cta-subtitle">
          Start extracting and analyzing clauses in seconds
        </p>
        <Link to="/upload" className="cta-button large">
          Get Started Now
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
