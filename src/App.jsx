import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import NavigationBreadcrumbs from './components/NavigationBreadcrumbs';
import SearchForm from './components/SearchForm';
import SearchMetadata from './components/SearchMetadata';
import SearchHistory from './components/SearchHistory';
import Spinner from './components/Spinner';
import './index.css';

// Lazy load the RecipeTree component for better performance
const RecipeTree = lazy(() => import('./components/RecipeTree'));

function App() {
  // View state: 'form', 'results', or 'split'
  const [viewMode, setViewMode] = useState('form');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage on initial render
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('searchHistory');
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Failed to load search history from localStorage', e);
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    } catch (e) {
      console.error('Failed to save search history to localStorage', e);
    }
  }, [searchHistory]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle if no text input is focused
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Ctrl+F for form view
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setViewMode('form');
      }
      // Ctrl+R for results view (only if results exist)
      else if (e.ctrlKey && e.key === 'r' && searchResults) {
        e.preventDefault();
        setViewMode('results');
      }
      // Ctrl+S for split view
      else if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        setViewMode('split');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchResults]);

  const handleSearch = (formData) => {
    setLoading(true);
    setCurrentSearch(formData);
    
    // Add to search history, avoiding duplicates
    setSearchHistory(prev => {
      const filtered = prev.filter(item => 
        item.targetElement !== formData.targetElement || 
        item.algorithm !== formData.algorithm ||
        item.isMultiple !== formData.isMultiple
      );
      return [formData, ...filtered.slice(0, 4)]; // Keep last 5 searches
    });
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSearchResults({
        recipes: [],
        stats: { time: 120, nodesVisited: 42 }
      });
      
      // Switch to results view if not in split mode
      if (viewMode !== 'split') {
        setViewMode('results');
      }
    }, 1500);
  };

  // Render form component
  const renderForm = () => (
    <div className="bg-white p-6 rounded shadow h-full">
      <h2 className="text-xl font-bold mb-4">Cari Recipe Elemen</h2>
      <SearchForm onSearch={handleSearch} />
      <SearchHistory 
        history={searchHistory} 
        onSelect={handleSearch}
      />
    </div>
  );

  // Render results component
  const renderResults = () => (
    <div className="bg-white p-6 rounded shadow h-full">
      {loading ? (
        <Spinner />
      ) : searchResults && currentSearch ? (
        <>
          <h2 className="text-xl font-bold mb-4">
            Recipe untuk {currentSearch.targetElement}
          </h2>
          
          <SearchMetadata searchParams={currentSearch} />
          
          <Suspense fallback={<div className="p-8 text-center">Loading visualizer...</div>}>
            {/* Placeholder for RecipeTree */}
            <div className="border p-4 rounded bg-gray-50 text-center mb-4 min-h-[300px] flex items-center justify-center">
              <p className="text-gray-500">
                Visualisasi recipe tree akan ditampilkan di sini
              </p>
            </div>
          </Suspense>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded">
            <div>
              <p className="text-sm text-gray-600">Waktu pencarian:</p>
              <p className="font-semibold">{searchResults.stats.time} ms</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Node yang dikunjungi:</p>
              <p className="font-semibold">{searchResults.stats.nodesVisited}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p>Belum ada hasil pencarian.</p>
          <button 
            onClick={() => setViewMode('form')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Mulai Pencarian
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-blue-600 p-2 z-50"
      >
        Langsung ke konten utama
      </a>
      
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentSearch={currentSearch}
      />
      
      <NavigationBreadcrumbs 
        currentView={viewMode} 
        onSwitchView={setViewMode}
      />
      
      <main id="main-content" className="container mx-auto px-4 py-4">
        {/* Form View */}
        {viewMode === 'form' && (
          <div className="max-w-4xl mx-auto">
            {renderForm()}
          </div>
        )}
        
        {/* Results View */}
        {viewMode === 'results' && (
          <div className="max-w-4xl mx-auto">
            {renderResults()}
          </div>
        )}
        
        {/* Split View */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>{renderForm()}</div>
            <div>{renderResults()}</div>
          </div>
        )}
      </main>
      
      {/* Footer with keyboard shortcuts reminder */}
      <footer className="mt-auto py-4 px-4 text-center text-sm text-gray-500 border-t">
        <p>Little Alchemy 2 Recipe Finder - Tugas Besar 2 Strategi Algoritma</p>
        <p className="mt-1">
          Keyboard Shortcuts: <span className="font-mono">Ctrl+F</span> (Form), 
          <span className="font-mono">Ctrl+R</span> (Results), 
          <span className="font-mono">Ctrl+S</span> (Split View)
        </p>
      </footer>
    </div>
  );
}

export default App;