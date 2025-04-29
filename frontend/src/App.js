import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import StockChart from './components/StockChart';
import TechnicalIndicators from './components/TechnicalIndicators';
import SentimentAnalysis from './components/SentimentAnalysis';
import { fetchStockData, addTechnicalIndicators, fetchSentimentAnalysis } from './services/api';

function App() {
  const [stockData, setStockData] = useState([]);
  const [ticker, setTicker] = useState('AAPL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sentimentData, setSentimentData] = useState([]);

  const fetchData = async (ticker, period, interval = '1d') => {
    setLoading(true);
    setError(null);
    setTicker(ticker);

    try {
      // Fetch stock data
      const stockResult = await fetchStockData(ticker, period, interval);
      if (!stockResult.success) {
        new Error(stockResult.error || 'Failed to fetch stock data');
      }

      // Add technical indicators
      const indicatorsResult = await addTechnicalIndicators(stockResult.data);
      if (!indicatorsResult.success) {
        new Error(indicatorsResult.error || 'Failed to add technical indicators');
      }

      // Fetch sentiment analysis
      const sentimentResult = await fetchSentimentAnalysis(ticker);
      if (!sentimentResult.success) {
        new Error(sentimentResult.error || 'Failed to fetch sentiment data');
      }

      setStockData(indicatorsResult.data);
      setSentimentData(sentimentResult.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Default load for AAPL on first render
  useEffect(() => {
    fetchData('AAPL', '1mo', '1d').then(r => console.error("Error fetching data!", r));
  }, []);

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="display-5 fw-bold">Trading Window</h1>
        <p className="lead">Stock analysis and visualization tool</p>
      </header>

      <SearchBar onSearch={fetchData} />

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Fetching data for {ticker}...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && stockData.length > 0 && (
        <div className="row">
          <div className="col-lg-8">
            <StockChart data={stockData} ticker={ticker} />
            <TechnicalIndicators data={stockData} />
          </div>
          <div className="col-lg-4">
            <SentimentAnalysis sentimentData={sentimentData} />
          </div>
        </div>
      )}

      <footer className="pt-3 mt-4 text-muted border-top">
        &copy; 2023 Trading Window
      </footer>
    </div>
  );
}

export default App;
