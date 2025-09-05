import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
      setLocation('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city name"
        disabled={loading}
      />
      <button type="submit" disabled={loading || !location.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </button>

{/* hello */}

    </form>
  );
};

export default SearchBar;