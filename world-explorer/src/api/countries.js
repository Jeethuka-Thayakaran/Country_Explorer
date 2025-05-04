const API_URL = 'https://restcountries.com/v3.1';

//Fetch all countries
export const fetchAllCountries = async () => {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching countries:', error);
        return [];
    }
};

//Fetch country by name
export const fetchCountryByName = async (name) => {
    try {
        const response = await fetch(`${API_URL}/name/${name}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch country with name: ${name}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error fetching country by name (${name})`, error);
        return [];
    }
};

//Fetch country by code
export const fetchCountryByCode = async (code) => {
    try {
        const response = await fetch(`${API_URL}/alpha/${code}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch country with name: ${code}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error fetching country by name (${code})`, error);
        return [];
    }
};

//Fetch all available region for filtering
export const fetchByRegion = async () => {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch regions');
        }
        // extract regions from countries data
        const region = [...new Set(data.map(country => country.region))];
        return region;
    } catch (error) {
        console.log('Error fetching regions:', error);
        return [];
    }
};

//Fetch all languages spoken in the countries
export const fetchCountriesByLanguage = async () => {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch languages');
        }
        // extract languages from countries data
        const languages = [...new Set(data.map(country => Object.values(country.languages || {})))];
        return languages;
    } catch (error) {
        console.log('Error fetching languages:', error);
        return [];
    }
};