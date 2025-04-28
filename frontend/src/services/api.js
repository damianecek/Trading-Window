import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
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