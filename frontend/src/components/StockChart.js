import React, {useState, useEffect} from 'react';
import {
  AreaChart, Area, Bar,
  ComposedChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
  Brush
} from 'recharts';
import '../styles/StockChart.css';

const StockChart = ({data, ticker}) => {
  const [chartType, setChartType] = useState('area'); // Default chart type
  const [livePrice, setLivePrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch live price - simulating real-time updates
  useEffect(() => {
    const fetchLivePrice = async () => {
      try {
        // This would be replaced with a real API call
        // For now we'll simulate by adding a small random adjustment to the latest price
        if (data && data.length > 0) {
          const latestPrice = data[data.length - 1].Close;
          const randomAdjustment = (Math.random() - 0.5) * 2; // Random value between -1 and 1
          const simulatedLivePrice = (parseFloat(latestPrice) + randomAdjustment).toFixed(2);
          setLivePrice(simulatedLivePrice);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (error) {
        console.error("Error fetching live price:", error);
      }
    };

    if (data && data.length > 0) {
      fetchLivePrice().then(r => console.error("Error fetching live price!", r));
      // Update every 30 seconds
      const interval = setInterval(fetchLivePrice, 30000);
      return () => clearInterval(interval);
    }
  }, [data, ticker]);

  // If no data or empty data, display a message
  if (!data || data.length === 0) {
    return <div className="text-center my-5">No stock data available</div>;
  }

  // Get min and max close price for YAxis domain
  const closePrices = data.map(item => Number(item.Close));
  const minPrice = Math.min(...closePrices) * 0.98; // 2% lower than minimum
  const maxPrice = Math.max(...closePrices) * 1.02; // 2% higher than maximum

  // Format data for the chart - ensure all data points are shown for smaller datasets
  const formatDataForChart = () => {
    return data.map(item => ({
      date: new Date(item.Date).toLocaleDateString(),
      time: new Date(item.Date).toLocaleTimeString(),
      close: Number(parseFloat(item.Close)).toFixed(2),
      open: item.Open ? Number(parseFloat(item.Open)).toFixed(2) : null,
      high: item.High ? Number(parseFloat(item.High)).toFixed(2) : null,
      low: item.Low ? Number(parseFloat(item.Low)).toFixed(2) : null,
      volume: item.Volume ? Number(item.Volume) : null,
      sma: item.SMA_50 ? Number(parseFloat(item.SMA_50)).toFixed(2) : null,
      rsi: item.RSI ? Number(parseFloat(item.RSI)).toFixed(2) : null,
      macd: item.MACD ? Number(parseFloat(item.MACD)).toFixed(2) : null,
      fullDate: new Date(item.Date).toLocaleString(),
    }));
  };

  const formattedData = formatDataForChart();

  // More detailed tooltip that shows date + time for intraday data
  const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '12px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
        }}>
          <p className="label fw-bold mb-2">{dataPoint.fullDate}</p>
          <div className="tooltip-data">
            {payload.map((entry, index) => (
              <p key={`item-${index}`} style={{color: entry.color, margin: '5px 0'}}>
                <span className="fw-bold">{entry.name}:</span> {entry.value}
              </p>
            ))}
            {dataPoint.open && (
              <>
                <p style={{margin: '5px 0'}}><span className="fw-bold">Open:</span> {dataPoint.open}</p>
                <p style={{margin: '5px 0'}}><span className="fw-bold">High:</span> {dataPoint.high}</p>
                <p style={{margin: '5px 0'}}><span className="fw-bold">Low:</span> {dataPoint.low}</p>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Improved Candlestick Chart rendering
  const renderCandlestick = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={formattedData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
          <XAxis
            dataKey="date"
            tick={{fontSize: 12}}
            tickMargin={10}
            minTickGap={15}
          />
          <YAxis
            domain={[minPrice, maxPrice]}
            tick={{fontSize: 12}}
            tickMargin={10}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip/>}/>
          <Legend/>

          {/* Candlesticks are drawn manually to ensure proper rendering */}
          {formattedData.map((entry, index) => {
            if (!entry.open || !entry.close || !entry.high || !entry.low) return null;

            const open = parseFloat(entry.open);
            const close = parseFloat(entry.close);
            const isPositive = close >= open;
            const color = isPositive ? "#16c784" : "#ea3943";

            return (
              <g key={`candle-${index}`}>
                {/* Vertical line from high to low */}
                <Line
                  dataKey={() => index}
                  stroke={color}
                  dot={false}
                  isAnimationActive={false}
                  points={[
                    {x: index, y: entry.high},
                    {x: index, y: entry.low}
                  ]}
                />

                {/* Rectangle for body of candlestick */}
                <Bar
                  dataKey={() => isPositive ? close - open : open - close}
                  barSize={10}
                  fill={color}
                  stackId="candlestick"
                  isAnimationActive={false}
                />
              </g>
            );
          })}

          {/* Add SMA line */}
          <Line
            type="monotone"
            dataKey="sma"
            name="SMA (50)"
            stroke="#fd7e14"
            dot={false}
            strokeDasharray="5 5"
          />

          <Brush
            dataKey="date"
            height={30}
            stroke="#8884d8"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  // Render chart based on selected type
  const renderChart = () => {
    // Always show dots for datasets with few points
    const showDots = formattedData.length < 20;

    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={formattedData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <defs>
                <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0d6efd" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorSma" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fd7e14" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#fd7e14" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis
                dataKey="date"
                tick={{fontSize: 12}}
                tickMargin={10}
                minTickGap={15}
              />
              <YAxis
                domain={[minPrice, maxPrice]}
                tick={{fontSize: 12}}
                tickMargin={10}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip/>}/>
              <Legend/>
              <Area
                type="monotone"
                dataKey="close"
                name="Close Price"
                stroke="#0d6efd"
                fillOpacity={1}
                fill="url(#colorClose)"
                dot={showDots}
                activeDot={{r: 8}}
              />
              <Area
                type="monotone"
                dataKey="sma"
                name="SMA (50)"
                stroke="#fd7e14"
                fillOpacity={0.5}
                fill="url(#colorSma)"
                strokeDasharray="5 5"
                dot={showDots}
              />
              <Brush
                dataKey="date"
                height={30}
                stroke="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'candlestick':
        return renderCandlestick();

      case 'volume':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={formattedData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis
                dataKey="date"
                tick={{fontSize: 12}}
                tickMargin={10}
                minTickGap={15}
              />
              <YAxis
                yAxisId="left"
                domain={[minPrice, maxPrice]}
                tick={{fontSize: 12}}
                tickMargin={10}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{fontSize: 12}}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip/>}/>
              <Legend/>
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="close"
                name="Close Price"
                stroke="#0d6efd"
                dot={showDots}
                activeDot={{r: 8}}
              />
              <Bar
                yAxisId="right"
                dataKey="volume"
                name="Volume"
                fill="#8884d8"
                opacity={0.5}
              />
              <Brush
                dataKey="date"
                height={30}
                stroke="#8884d8"
              />
            </ComposedChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">{ticker} Stock Price</h5>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${chartType === 'area' ? 'btn-light' : 'btn-outline-light'}`}
              onClick={() => setChartType('area')}
            >
              Area
            </button>
            <button
              type="button"
              className={`btn btn-sm ${chartType === 'candlestick' ? 'btn-light' : 'btn-outline-light'}`}
              onClick={() => setChartType('candlestick')}
            >
              Candlestick
            </button>
            <button
              type="button"
              className={`btn btn-sm ${chartType === 'volume' ? 'btn-light' : 'btn-outline-light'}`}
              onClick={() => setChartType('volume')}
            >
              Volume
            </button>
          </div>
        </div>
        {livePrice && (
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-light text-dark me-2">Live: ${livePrice}</span>
              <span className="badge bg-light text-dark">
                {parseFloat(livePrice) > parseFloat(data[data.length - 1].Close) ?
                  <span className="text-success">▲</span> :
                  <span className="text-danger">▼</span>
                }
                {Math.abs(parseFloat(livePrice) - parseFloat(data[data.length - 1].Close)).toFixed(2)}
              </span>
            </div>
            <small className="text-light">Updated: {lastUpdated}</small>
          </div>
        )}
      </div>
      <div className="card-body">
        {renderChart()}
      </div>
    </div>
  );
};

export default StockChart;
