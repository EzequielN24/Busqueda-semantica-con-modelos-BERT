import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="search-container"
    >
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe una idea o pregunta..."
            className="search-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`search-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Sparkles size={20} />
              </motion.div>
            ) : (
              <>
                <span>Buscar</span>
                <Sparkles size={16} />
              </>
            )}
          </button>
        </div>
      </form>
      
      <style jsx>{`
        .search-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .search-form {
          position: relative;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          padding: 0.5rem 0.5rem 0.5rem 1.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        }

        .input-wrapper:focus-within {
          border-color: var(--accent-primary);
          box-shadow: 0 0 20px rgba(0, 242, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
        }

        .search-icon {
          color: var(--text-muted);
          margin-right: 1rem;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-main);
          font-size: 1.1rem;
          outline: none;
          font-family: var(--font-body);
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .search-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--accent-primary);
          color: #000;
          border: none;
          border-radius: 100px;
          padding: 0.8rem 1.5rem;
          font-weight: 600;
          font-family: var(--font-display);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.85rem;
        }

        .search-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 242, 255, 0.4);
          filter: brightness(1.1);
        }

        .search-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .search-button.loading {
          background: var(--accent-secondary);
          color: white;
        }
      `}</style>
    </motion.div>
  );
};

export default SearchBar;
