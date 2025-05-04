import React, { useState, useEffect } from 'react';
import './Filters.css';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
const languages = ['English', 'Spanish', 'French', 'Arabic', 'Chinese', 'Russian', 'Tamil', 'Sinhala'];

const Filters = ({ onFilterChange }) => {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        onFilterChange({
            region: selectedRegion,
            language: selectedLanguage
        });
    }, [selectedRegion, selectedLanguage, onFilterChange]);

    return (
        <div className="filters-container">
            <div className="select-container">
                <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Filter by Region</option>
                    {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>

            <div className="select-container">
                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Filter by Language</option>
                    {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filters;
