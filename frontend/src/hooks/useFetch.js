import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from an API
 * @param {string} url - The URL to fetch data from
 * @param {Object} options - Fetch options
 * @returns {Object} - { data, loading, error, refetch }
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Function to manually refetch data
  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [url]); // Re-fetch when URL changes

  return { data, loading, error, refetch };
};

export default useFetch;
