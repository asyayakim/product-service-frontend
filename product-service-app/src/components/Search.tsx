import { useState } from 'react';
import axios from 'axios';

interface SearchResult {
  text: string;
  metadata: string;
  similarity: number;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      // Replace with your actual backend URL
      const response = await axios.post('http://localhost:5000/search', {
        query
      });
      setResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          disabled={loading}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="results">
          <h3>Top Results:</h3>
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <p><strong>Product:</strong> {result.text}</p>
              <p><strong>Category:</strong> {result.metadata.split(':')[1]?.trim() || result.metadata}</p>
              <p><strong>Match:</strong> {(result.similarity * 100).toFixed(1)}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}