# Trading Window

A web application for stock analysis and visualization. This project consists of:

- Frontend: React-based UI for visualizing stock data and analysis
- Backend: Flask API that provides stock data, technical indicators, and sentiment analysis

## Features

- Stock price data visualization
- Technical indicators (SMA, RSI, MACD)
- Sentiment analysis of stock-related news
- Modern, responsive UI

## Project Structure

```
trading-window/
├── backend/               # Python Flask backend
│   ├── api/               # API modules
│   │   ├── data_ingestion.py
│   │   ├── technical_analysis.py
│   │   └── sentiment_analysis.py
│   ├── data/              # Data storage
│   │   └── raw/           # Raw stock data
│   ├── app.py             # Main Flask application
│   └── requirements.txt   # Python dependencies
│
└── frontend/              # React frontend
    ├── public/            # Static files
    └── src/               # React source code
        ├── components/    # React components
        ├── services/      # API service connections
        └── App.js         # Main React application
```

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```
   python app.py
   ```
   The backend will be available at http://localhost:5000

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The frontend will be available at http://localhost:3000

## API Endpoints

- `GET /api/stock-data?ticker=AAPL&period=24mo`: Get stock data for a specific ticker and time period
- `POST /api/technical-indicators`: Add technical indicators to stock data
- `GET /api/sentiment?ticker=AAPL`: Get sentiment analysis for a specific ticker
- `GET /api/health`: Health check endpoint

## Technologies Used

- Backend: Flask, pandas, yfinance, ta, VaderSentiment
- Frontend: React, Bootstrap, Recharts (for charts)
- API Communication: Axios

## License

MIT
