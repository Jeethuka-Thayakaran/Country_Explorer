import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            onSearch(input.trim());
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [input, onSearch]);

    return (
        <div className="searchbar-container">
            <div className="searchbar-wrapper">
                <input
                    type="text"
                    placeholder="Search for a country..."
                    className="searchbar-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
