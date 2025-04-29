import axios from 'axios';

// Determine base URL dynamically based on current environment
const getBaseUrl = () => {
  // Fetch hostname from current URL
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  // If we're running locally
  if (['localhost', '127.0.0.1'].includes(hostname)) {
    return 'http://localhost:5000/api';
  }
  
  // If we're running on the same machine but via IP or domain
  if (port === '3000') {
    return `https://${hostname}:5000/api`;
  }
  
  // If we're accessing from external network and the API is on the same domain
  // This assumes you're deploying both frontend and backend behind the same domain
  return `/api`;
};

const API_URL = getBaseUrl();

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

// API functions
export const fetchStockData = async (ticker, period = '1mo', interval = '1d') => {
  try {
    const response = await api.get(`/stock-data?ticker=${ticker}&period=${period}&interval=${interval}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return { success: false, error: error.message };
  }
};

export const addTechnicalIndicators = async (stockData) => {
  try {
    const response = await api.post('/technical-indicators', stockData);
    return response.data;
  } catch (error) {
    console.error('Error adding technical indicators:', error);
    return { success: false, error: error.message };
  }
};

export const fetchSentimentAnalysis = async (ticker) => {
  try {
    const response = await api.get(`/sentiment?ticker=${ticker}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sentiment analysis:', error);
    return { success: false, error: error.message };
  }
};