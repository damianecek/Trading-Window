import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [ticker, setTicker] = useState('');
  const [period, setPeriod] = useState('1mo');
  const [interval, setInterval] = useState('1d');
  const [availableIntervals, setAvailableIntervals] = useState([]);

  // Define valid intervals for each period
  const periodIntervals = {
    '1d': ['1m', '2m', '5m', '15m', '30m', '60m', '90m'],
    '5d': ['5m', '15m', '30m', '60m', '90m', '1d'],
    '1mo': ['30m', '60m', '1d', '5d', '1wk'],
    '3mo': ['1d', '5d', '1wk', '1mo'],
    '6mo': ['1d', '5d', '1wk', '1mo'],
    '1y': ['1d', '5d', '1wk', '1mo'],
    '2y': ['1d', '5d', '1wk', '1mo'],
    '5y': ['1d', '5d', '1wk', '1mo', '3mo'],
    'max': ['1d', '5d', '1wk', '1mo', '3mo']
  };

  // Interval display names for readability
  const intervalNames = {
    '1m': '1 Minute',
    '2m': '2 Minutes',
    '5m': '5 Minutes',
    '15m': '15 Minutes',
    '30m': '30 Minutes',
    '60m': '1 Hour',
    '90m': '90 Minutes',
    '1d': '1 Day',
    '5d': '5 Days',
    '1wk': '1 Week',
    '1mo': '1 Month',
    '3mo': '3 Months'
  };

  // Update available intervals when period changes
  useEffect(() => {
    if (period in periodIntervals) {
      const intervals = periodIntervals[period];
      setAvailableIntervals(intervals);
      
      // If current interval is not valid for the selected period, select the first valid one
      if (!intervals.includes(interval)) {
        setInterval(intervals[0]);
      }
    }
  }, [period]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker.trim()) {
      onSearch(ticker.trim().toUpperCase(), period, interval);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">Stock Ticker</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., AAPL, TSLA, MSFT"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">Period</span>
                <select 
                  className="form-select" 
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="1d">1 Day</option>
                  <option value="5d">5 Days</option>
                  <option value="1mo">1 Month</option>
                  <option value="3mo">3 Months</option>
                  <option value="6mo">6 Months</option>
                  <option value="1y">1 Year</option>
                  <option value="2y">2 Years</option>
                  <option value="5y">5 Years</option>
                  <option value="max">Max</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">Interval</span>
                <select 
                  className="form-select" 
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                >
                  {availableIntervals.map(int => (
                    <option key={int} value={int}>
                      {intervalNames[int]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Analyze
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar; 