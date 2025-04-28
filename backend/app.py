from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from api.data_ingestion import fetch_stock_data
from api.technical_analysis import add_technical_indicators
from api.sentiment_analysis import analyze_news_sentiment
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    ticker = request.args.get('ticker', 'AAPL')
    period = request.args.get('period', '1mo')
    interval = request.args.get('interval', '1d')
    
    # Fetch data
    result = fetch_stock_data(ticker, period, interval)
    return jsonify(result)

@app.route('/api/technical-indicators', methods=['POST'])
def get_technical_indicators():
    data = request.json
    if not data:
        return jsonify({"success": False, "error": "No data provided"})
    
    # Add indicators
    result = add_technical_indicators(data)
    return jsonify(result)

@app.route('/api/sentiment', methods=['GET'])
def get_sentiment():
    ticker = request.args.get('ticker', 'AAPL')
    
    # Get sentiment analysis
    result = analyze_news_sentiment(ticker)
    return jsonify(result)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 