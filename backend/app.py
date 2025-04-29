import os

from api.data_ingestion import fetch_stock_data
from api.sentiment_analysis import analyze_news_sentiment
from api.technical_analysis import add_technical_indicators
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# More specific CORS configuration with your public IP
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS(app, resources={r"/api/*": {"origins": allowed_origins}})


@app.route("/api/stock-data", methods=["GET"])
def get_stock_data():
    ticker = request.args.get("ticker", "AAPL")
    period = request.args.get("period", "1mo")
    interval = request.args.get("interval", "1d")

    # Fetch data
    result = fetch_stock_data(ticker, period, interval)
    return jsonify(result)


@app.route("/api/technical-indicators", methods=["POST"])
def get_technical_indicators():
    data = request.json
    if not data:
        return jsonify({"success": False, "error": "No data provided"})

    # Add indicators
    result = add_technical_indicators(data)
    return jsonify(result)


@app.route("/api/sentiment", methods=["GET"])
def get_sentiment():
    ticker = request.args.get("ticker", "AAPL")

    # Get sentiment analysis
    result = analyze_news_sentiment(ticker)
    return jsonify(result)


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy"})


# Add a root route for basic connectivity testing
@app.route("/", methods=["GET"])
def root():
    return jsonify(
        {
            "message": "Trading Window API Server is running",
            "endpoints": [
                "/api/health",
                "/api/stock-data",
                "/api/technical-indicators",
                "/api/sentiment",
            ],
        }
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    # Ensure we're listening on all interfaces with production settings
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)
