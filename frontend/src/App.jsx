import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, BrainCircuit, Activity, ChevronDown } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import { searchDocuments } from './services/api';

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState('roberta');

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      // Pasamos el modelo seleccionado a la API
      const data = await searchDocuments(query, selectedModel);
      setResults(data.results);
    } catch (err) {
      setError('No se pudo conectar con el motor de IA. ¿Está el backend encendido?');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="main-header">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="logo-container"
        >
          <div className="logo-icon-wrapper">
            <BrainCircuit className="logo-icon" size={32} />
            <div className="logo-glow"></div>
          </div>
          <div className="logo-text">
            <h1 className="glow-text">NEURAL SEARCH</h1>
            <span className="tagline">Buscador Semántico Multimodelo</span>
          </div>
        </motion.div>

        <div className="controls-row">
          <div className="model-selector-wrapper">
            <Cpu size={14} className="selector-icon" />
            <select 
              value={selectedModel} 
              onChange={(e) => setSelectedModel(e.target.value)}
              className="model-select"
            >
              <option value="bert">BERT Base</option>
              <option value="roberta">RoBERTa</option>
              <option value="multilingual">Multilingüe (MiniLM)</option>
              <option value="minilm-l6-v2">MiniLM L6-v2</option>
            </select>
            <ChevronDown size={14} className="chevron" />
          </div>
        </div>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="error-message glass-card"
          >
            <Activity size={18} />
            <p>{error}</p>
          </motion.div>
        )}

        <div className="results-info">
          {results.length > 0 && (
            <p>Resultados optimizados con <strong>{selectedModel.toUpperCase()}</strong></p>
          )}
        </div>

        <ResultsList results={results} />
      </main>

      <footer className="app-footer">
        <p>© 2024 Portfolio Project • IA & Software Architecture</p>
      </footer>

      <style jsx>{`
        .app-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-header {
          padding: 3rem 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-icon {
          color: var(--accent-primary);
          z-index: 1;
        }

        .logo-glow {
          position: absolute;
          width: 40px;
          height: 40px;
          background: var(--accent-primary);
          filter: blur(15px);
          opacity: 0.4;
        }

        .logo-text h1 {
          font-size: 2.5rem;
          line-height: 1;
          background: linear-gradient(to right, #fff, var(--accent-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tagline {
          font-size: 0.9rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .controls-row {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .model-selector-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          transition: all 0.3s ease;
        }

        .model-selector-wrapper:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-primary);
        }

        .selector-icon {
          color: var(--accent-primary);
          margin-right: 0.8rem;
        }

        .model-select {
          appearance: none;
          background: transparent;
          border: none;
          color: var(--text-main);
          font-family: var(--font-body);
          font-size: 0.85rem;
          padding-right: 1.5rem;
          outline: none;
          cursor: pointer;
        }

        .chevron {
          position: absolute;
          right: 0.8rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .results-info {
          text-align: center;
          margin-bottom: 1rem;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .results-info strong {
          color: var(--accent-primary);
        }

        .error-message {
          max-width: 500px;
          margin: 2rem auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #ff4d4d;
          border-color: rgba(255, 77, 77, 0.2);
        }

        main {
          flex: 1;
        }

        .app-footer {
          padding: 2rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.8rem;
          border-top: 1px solid var(--glass-border);
        }

        @media (max-width: 600px) {
          .logo-text h1 {
            font-size: 1.8rem;
          }
          .main-header {
            padding-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
