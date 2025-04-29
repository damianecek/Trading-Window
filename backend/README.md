# Trading Window Backend

This is the backend application for the Trading Window project. It's built with Flask and provides an API for stock data retrieval, technical analysis, and sentiment analysis.

## Project Structure

The backend is organized as follows:

- `api/`: API modules organized by feature
  - `data_ingestion.py`: Functions for fetching and processing stock data
  - `technical_analysis.py`: Technical indicators and analysis
  - `sentiment_analysis.py`: Sentiment analysis of stock-related news
- `data/`: Data storage and caching
- `app.py`: Main Flask application entry point

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (latest version recommended)

### Installation

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Development

To start the development server:

```bash
python app.py
```

This will start the application at http://localhost:5000.

### Production Deployment

For production deployment, use Gunicorn:

```bash
gunicorn app:app
```

You can configure Gunicorn with additional parameters as needed.

### Code Quality

The project uses several tools to maintain code quality:

- To format code with Black:
  ```bash
  black .
  ```
- To check code with Flake8:
  ```bash
  flake8 .
  ```
- To sort imports with isort:
  ```bash
  isort .
  ```

## API Endpoints

- `GET /api/stock-data?ticker=AAPL&period=1mo&interval=1d`: Get stock data for a specific ticker
- `POST /api/technical-indicators`: Add technical indicators to stock data
- `GET /api/sentiment?ticker=AAPL`: Get sentiment analysis for a specific ticker
- `GET /api/health`: Health check endpoint
- `GET /`: Root endpoint with API information

## Dependencies

- Flask: Web framework
- pandas: Data manipulation and analysis
- yfinance: Yahoo Finance data retrieval
- ta: Technical analysis library
- vaderSentiment: Sentiment analysis
- matplotlib: Data visualization
- gunicorn: WSGI HTTP Server for production
- python-dotenv: Environment variable management

## Contributing

Please follow the coding standards and best practices outlined in the project's CODING_STANDARDS.md file.
