import React, { useState } from 'react';
import './ResultsDisplay.css';

function ResultsDisplay({ results, onReset }) {
  const [expandedClauses, setExpandedClauses] = useState(new Set());

  const toggleClause = (clauseId) => {
    const newExpanded = new Set(expandedClauses);
    if (newExpanded.has(clauseId)) {
      newExpanded.delete(clauseId);
    } else {
      newExpanded.add(clauseId);
    }
    setExpandedClauses(newExpanded);
  };

  const getConfidenceBadge = (confidence) => {
    if (confidence >= 0.8) return { text: 'High', className: 'badge-high' };
    if (confidence >= 0.6) return { text: 'Medium', className: 'badge-medium' };
    return { text: 'Low', className: 'badge-low' };
  };

  const getStatusBadge = (status) => {
    if (status === 'compliant') return { text: 'Compliant', className: 'badge-success' };
    if (status === 'needs_review') return { text: 'Needs Review', className: 'badge-warning' };
    return { text: 'No Playbook', className: 'badge-neutral' };
  };

  return (
    <div className="results-display">
      <div className="alert success">
        <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <div>
          <strong>Analysis Complete!</strong> Successfully processed {results.filename}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{results.statistics.total}</div>
            <div className="stat-label">Clauses Found</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{results.statistics.high_risk}</div>
            <div className="stat-label">Red Flags</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{(results.statistics.avg_confidence * 100).toFixed(0)}%</div>
            <div className="stat-label">Avg Confidence</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{results.statistics.clause_types}</div>
            <div className="stat-label">Clause Types</div>
          </div>
        </div>
      </div>

      <div className="clauses-section">
        <div className="section-header">
          <h2 className="section-title">Extracted Clauses</h2>
          <button onClick={onReset} className="btn btn-outline">
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Analyze Another
          </button>
        </div>

        <div className="clauses-list">
          {results.clauses.map((clause) => {
            const confidenceBadge = getConfidenceBadge(clause.confidence);
            const statusBadge = getStatusBadge(clause.comparison.status);
            const isExpanded = expandedClauses.has(clause.id);

            return (
              <div key={clause.id} className="clause-card">
                <div className="clause-header" onClick={() => toggleClause(clause.id)}>
                  <div className="clause-header-left">
                    <span className="clause-number">#{clause.id}</span>
                    <h3 className="clause-title">{clause.type}</h3>
                  </div>
                  <div className="clause-header-right">
                    <span className={`badge ${confidenceBadge.className}`}>
                      {confidenceBadge.text} ({(clause.confidence * 100).toFixed(0)}%)
                    </span>
                    <span className={`badge ${statusBadge.className}`}>
                      {statusBadge.text}
                    </span>
                    <svg 
                      className={`expand-icon ${isExpanded ? 'expanded' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="clause-body">
                    <div className="clause-section">
                      <h4 className="clause-section-title">Clause Text:</h4>
                      <p className="clause-text">{clause.full_text || clause.text}</p>
                    </div>

                    {clause.comparison.status !== 'no_playbook' && (
                      <div className="clause-section">
                        <h4 className="clause-section-title">Playbook Comparison:</h4>
                        
                        <div className="comparison-grid">
                          <div className="comparison-item">
                            <span className="comparison-label">Compliance Score:</span>
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ 
                                  width: `${clause.comparison.score * 100}%`,
                                  background: clause.comparison.score >= 0.7 ? '#10b981' : '#f59e0b'
                                }}
                              />
                            </div>
                            <span className="comparison-value">{(clause.comparison.score * 100).toFixed(0)}%</span>
                          </div>
                        </div>

                        {clause.comparison.red_flags?.length > 0 && (
                          <div className="warning-box">
                            <strong>⚠️ Red Flags:</strong>
                            <ul className="warning-list">
                              {clause.comparison.red_flags.map((flag, idx) => (
                                <li key={idx}>{flag}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {clause.comparison.missing?.length > 0 && (
                          <div className="info-box">
                            <strong>ℹ️ Missing Elements:</strong>
                            <ul className="info-list">
                              {clause.comparison.missing.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {clause.comparison.preferred && (
                          <div className="preferred-box">
                            <strong>✓ Preferred Language:</strong>
                            <p className="preferred-text">{clause.comparison.preferred}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;
