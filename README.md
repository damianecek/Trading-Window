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

## Development

### Code Standards and Linting

This project uses several tools to maintain code quality:

- **Python**: Black for formatting, Flake8 for linting, isort for import sorting
- **JavaScript**: ESLint for linting, Prettier for formatting
- **Editor Config**: .editorconfig file for consistent editor settings

To run linting and formatting:

**Backend:**
```bash
# Format code with Black
black backend

# Check code with Flake8
flake8 backend

# Sort imports
isort backend
```

**Frontend:**
```bash
cd frontend

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

For more information on the project structure and coding standards, see:
- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Coding Standards](docs/CODING_STANDARDS.md)

## License

MIT
