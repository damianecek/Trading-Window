import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TechnicalIndicators = ({ data }) => {
  const [selectedIndicator, setSelectedIndicator] = useState('overview');
  
  // If no data or empty data, display a message
  if (!data || data.length === 0) {
    return <div className="text-center my-5">No technical indicators available</div>;
  }

  // Get the most recent data point for displaying current indicators
  const latestData = data[data.length - 1];
  
  // Format data for charts - limit to last 30 data points for better visualization
  const chartData = data.slice(-30).map(item => ({
    date: new Date(item.Date).toLocaleDateString(),
    close: Number(parseFloat(item.Close)).toFixed(2),
    sma50: item.SMA_50 ? Number(parseFloat(item.SMA_50)).toFixed(2) : null,
    rsi: item.RSI ? Number(parseFloat(item.RSI)).toFixed(2) : null,
    macd: item.MACD ? Number(parseFloat(item.MACD)).toFixed(2) : null,
  }));

  // Helper function to determine RSI trend
  const getRsiTrend = (rsi) => {
    if (rsi > 70) return { text: 'Overbought', className: 'text-danger', description: 'Stock may be overvalued, potential sell signal' };
    if (rsi < 30) return { text: 'Oversold', className: 'text-success', description: 'Stock may be undervalued, potential buy signal' };
    if (rsi > 60) return { text: 'Strength', className: 'text-warning', description: 'Showing bullish momentum, but watch for overbought conditions' };
    if (rsi < 40) return { text: 'Weakness', className: 'text-warning', description: 'Showing bearish momentum, but watch for oversold conditions' };
    return { text: 'Neutral', className: 'text-secondary', description: 'No strong momentum signals in either direction' };
  };

  // Helper function to determine MACD trend
  const getMacdTrend = (macd) => {
    if (!macd) return { text: 'N/A', className: '', description: 'Data not available' };
    
    if (macd > 1) return { text: 'Strong Bullish', className: 'text-success', description: 'Strong positive momentum, buying signal' };
    if (macd > 0) return { text: 'Bullish', className: 'text-success', description: 'Positive momentum, consider buying' };
    if (macd < -1) return { text: 'Strong Bearish', className: 'text-danger', description: 'Strong negative momentum, selling signal' };
    if (macd < 0) return { text: 'Bearish', className: 'text-danger', description: 'Negative momentum, consider selling' };
    return { text: 'Neutral', className: 'text-secondary', description: 'No clear momentum direction' };
  };

  // Helper function to determine SMA trend
  const getSmaTrend = (close, sma) => {
    if (!close || !sma) return { text: 'N/A', className: '', description: 'Data not available' };
    
    const pctDiff = ((close - sma) / sma) * 100;
    
    if (pctDiff > 10) return { text: 'Strong Uptrend', className: 'text-success', description: 'Price significantly above average, strong bullish signal' };
    if (pctDiff > 3) return { text: 'Uptrend', className: 'text-success', description: 'Price above average, bullish signal' };
    if (pctDiff < -10) return { text: 'Strong Downtrend', className: 'text-danger', description: 'Price significantly below average, strong bearish signal' };
    if (pctDiff < -3) return { text: 'Downtrend', className: 'text-danger', description: 'Price below average, bearish signal' };
    return { text: 'Sideways', className: 'text-secondary', description: 'Price close to moving average, no strong trend' };
  };

  // Format RSI value and trend
  const rsiValue = latestData.RSI ? parseFloat(latestData.RSI).toFixed(2) : 'N/A';
  const rsiTrend = getRsiTrend(latestData.RSI);
  
  // Format MACD value and trend
  const macdValue = latestData.MACD ? parseFloat(latestData.MACD).toFixed(2) : 'N/A';
  const macdTrend = getMacdTrend(latestData.MACD);
  
  // Format SMA value and trend
  const smaValue = latestData.SMA_50 ? parseFloat(latestData.SMA_50).toFixed(2) : 'N/A';
  const smaTrend = getSmaTrend(latestData.Close, latestData.SMA_50);
  
  // Calculate overall technical signal
  const calculateOverallSignal = () => {
    let bullishSignals = 0;
    let bearishSignals = 0;
    
    // RSI signals
    if (latestData.RSI < 30) bullishSignals += 1;
    if (latestData.RSI > 70) bearishSignals += 1;
    
    // MACD signals
    if (latestData.MACD > 0) bullishSignals += 1;
    if (latestData.MACD < 0) bearishSignals += 1;
    
    // SMA signals
    if (latestData.Close > latestData.SMA_50) bullishSignals += 1;
    if (latestData.Close < latestData.SMA_50) bearishSignals += 1;
    
    // Price momentum (last 5 days)
    const recentData = data.slice(-5);
    if (recentData.length >= 2) {
      const firstPrice = recentData[0].Close;
      const lastPrice = recentData[recentData.length - 1].Close;
      if (lastPrice > firstPrice) bullishSignals += 0.5;
      if (lastPrice < firstPrice) bearishSignals += 0.5;
    }
    
    if (bullishSignals > bearishSignals + 1) return { signal: 'Strong Buy', className: 'text-success fw-bold' };
    if (bullishSignals > bearishSignals) return { signal: 'Buy', className: 'text-success' };
    if (bearishSignals > bullishSignals + 1) return { signal: 'Strong Sell', className: 'text-danger fw-bold' };
    if (bearishSignals > bullishSignals) return { signal: 'Sell', className: 'text-danger' };
    return { signal: 'Hold', className: 'text-warning' };
  };
  
  const overallSignal = calculateOverallSignal();

  // Render a detailed RSI chart
  const renderRsiChart = () => (
    <div>
      <div className="mb-3">
        <h5>RSI (Relative Strength Index)</h5>
        <p>Measures momentum by comparing recent gains to recent losses. Values range from 0 to 100.</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="rsi" stroke="#8884d8" dot={false} />
          {/* Overbought line */}
          <Line 
            type="monotone" 
            dataKey={() => 70} 
            stroke="red" 
            strokeDasharray="3 3" 
            dot={false} 
          />
          {/* Oversold line */}
          <Line 
            type="monotone" 
            dataKey={() => 30} 
            stroke="green" 
            strokeDasharray="3 3" 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3">
        <div className="alert alert-secondary">
          <strong>Interpretation:</strong>
          <ul className="mb-0">
            <li>RSI above 70 is considered <span className="text-danger">overbought</span> (potential sell signal)</li>
            <li>RSI below 30 is considered <span className="text-success">oversold</span> (potential buy signal)</li>
            <li>RSI trend direction can indicate momentum</li>
          </ul>
        </div>
      </div>
    </div>
  );
  
  // Render a detailed MACD chart
  const renderMacdChart = () => (
    <div>
      <div className="mb-3">
        <h5>MACD (Moving Average Convergence Divergence)</h5>
        <p>Momentum indicator that shows the relationship between two moving averages of a price.</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar 
            dataKey="macd" 
            fill={(entry) => (entry.macd >= 0 ? '#16c784' : '#ea3943')} 
          />
          <Line 
            type="monotone" 
            dataKey={() => 0} 
            stroke="black" 
            strokeDasharray="3 3" 
            dot={false} 
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3">
        <div className="alert alert-secondary">
          <strong>Interpretation:</strong>
          <ul className="mb-0">
            <li>MACD above 0 suggests <span className="text-success">bullish momentum</span></li>
            <li>MACD below 0 suggests <span className="text-danger">bearish momentum</span></li>
            <li>MACD crossing above/below zero can signal trend changes</li>
          </ul>
        </div>
      </div>
    </div>
  );
  
  // Render a detailed SMA chart
  const renderSmaChart = () => (
    <div>
      <div className="mb-3">
        <h5>SMA (Simple Moving Average)</h5>
        <p>Shows the average price over a specified period, smoothing out price fluctuations.</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="close" name="Price" stroke="#0d6efd" dot={false} />
          <Line type="monotone" dataKey="sma50" name="SMA" stroke="#fd7e14" dot={false} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3">
        <div className="alert alert-secondary">
          <strong>Interpretation:</strong>
          <ul className="mb-0">
            <li>Price above SMA indicates <span className="text-success">bullish trend</span></li>
            <li>Price below SMA indicates <span className="text-danger">bearish trend</span></li>
            <li>Price crossing the SMA can signal potential trend reversals</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Render the overview of all indicators
  const renderOverview = () => (
    <div>
      <div className="alert alert-primary mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Technical Signal:</h5>
            <h3 className={overallSignal.className}>{overallSignal.signal}</h3>
          </div>
          <div className="text-end">
            <p className="mb-0">Based on {data.length} data points</p>
            <small className="text-muted">Last updated: {new Date(latestData.Date).toLocaleString()}</small>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <span>RSI (14)</span>
              <button 
                className="btn btn-sm btn-outline-primary" 
                onClick={() => setSelectedIndicator('rsi')}
              >
                Details
              </button>
            </div>
            <div className="card-body text-center">
              <h3 className={rsiTrend.className}>{rsiValue}</h3>
              <p className={rsiTrend.className}>{rsiTrend.text}</p>
              <small>{rsiTrend.description}</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <span>MACD</span>
              <button 
                className="btn btn-sm btn-outline-primary" 
                onClick={() => setSelectedIndicator('macd')}
              >
                Details
              </button>
            </div>
            <div className="card-body text-center">
              <h3 className={macdTrend.className}>{macdValue}</h3>
              <p className={macdTrend.className}>{macdTrend.text}</p>
              <small>{macdTrend.description}</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <span>SMA (50)</span>
              <button 
                className="btn btn-sm btn-outline-primary" 
                onClick={() => setSelectedIndicator('sma')}
              >
                Details
              </button>
            </div>
            <div className="card-body text-center">
              <h3>{smaValue}</h3>
              <p className={smaTrend.className}>{smaTrend.text}</p>
              <small>{smaTrend.description}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render content based on selected indicator
  const renderContent = () => {
    switch(selectedIndicator) {
      case 'rsi':
        return renderRsiChart();
      case 'macd':
        return renderMacdChart();
      case 'sma':
        return renderSmaChart();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Technical Indicators</h5>
        <div className="btn-group" role="group">
          <button 
            type="button" 
            className={`btn btn-sm ${selectedIndicator === 'overview' ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setSelectedIndicator('overview')}
          >
            Overview
          </button>
          <button 
            type="button" 
            className={`btn btn-sm ${selectedIndicator === 'rsi' ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setSelectedIndicator('rsi')}
          >
            RSI
          </button>
          <button 
            type="button" 
            className={`btn btn-sm ${selectedIndicator === 'macd' ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setSelectedIndicator('macd')}
          >
            MACD
          </button>
          <button 
            type="button" 
            className={`btn btn-sm ${selectedIndicator === 'sma' ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setSelectedIndicator('sma')}
          >
            SMA
          </button>
        </div>
      </div>
      <div className="card-body">
        {renderContent()}
      </div>
    </div>
  );
};

export default TechnicalIndicators; 