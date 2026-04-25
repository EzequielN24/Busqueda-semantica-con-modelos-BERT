import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target } from 'lucide-react';

const ResultsList = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="results-container">
      <AnimatePresence>
        {results.map((result, index) => (
          <motion.div
            key={result.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="result-card glass-card"
          >
            <div className="result-header">
               <div className="score-badge">
                 <Target size={14} className="score-icon" />
                 <span>{Math.round(result.score * 100)}% Similitud</span>
               </div>
               <span className="doc-id">DOCUMENTO #{result.id}</span>
            </div>
            
            <p className="result-text">{result.text}</p>
            
            <div className="result-footer">
               <div className="similarity-bar-container">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="similarity-bar"
                  />
               </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <style jsx>{`
        .results-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 0 1rem 4rem 1rem;
        }

        .result-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          overflow: hidden;
          border-left: 4px solid var(--accent-primary);
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .score-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(0, 242, 255, 0.1);
          color: var(--accent-primary);
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .doc-id {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-family: monospace;
          letter-spacing: 0.1em;
        }

        .result-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-main);
          font-weight: 400;
        }

        .similarity-bar-container {
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          width: 100%;
          margin-top: 0.5rem;
        }

        .similarity-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(0, 242, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ResultsList;
