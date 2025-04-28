import yfinance as yf
import pandas as pd
import os

def fetch_stock_data(ticker, period="1mo", interval="1d"):
    """
    Fetch stock data using the Yahoo Finance API
    
    Parameters:
    - ticker: Stock symbol (e.g., 'AAPL')
    - period: Time period to fetch (e.g., '1d', '5d', '1mo', '3mo', '1y', 'max')
    - interval: Data frequency (e.g., '1m', '5m', '15m', '1h', '1d', '1wk', '1mo')
    
    Note: Not all intervals are valid for all periods. For example:
    - '1d' period only supports '1m', '2m', '5m', '15m', '30m', '60m', '90m' intervals
    - '5d' period supports '5m', '15m', '30m', '60m', '90m', '1d' intervals
    - Longer periods have different valid intervals
    """
    try:
        print(f"Fetching {ticker} data with period={period} and interval={interval}")
        stock = yf.Ticker(ticker)
        data = stock.history(period=period, interval=interval)
        
        # Create data directory if it doesn't exist
        os.makedirs('../data/raw', exist_ok=True)
        
        # Save with interval information
        data.to_csv(f"../data/raw/{ticker}_{period}_{interval}.csv")
        
        # Handle empty dataframe
        if data.empty:
            return {"success": False, "error": f"No data available for {ticker} with period={period} and interval={interval}"}
        
        # Convert to dictionary for API response
        df_dict = data.reset_index().to_dict(orient='records')
        
        # Add metadata
        metadata = {
            "ticker": ticker,
            "period": period,
            "interval": interval,
            "data_points": len(data),
            "date_range": f"{data.index[0].strftime('%Y-%m-%d')} to {data.index[-1].strftime('%Y-%m-%d')}" if len(data) > 0 else "Empty"
        }
        
        return {"success": True, "data": df_dict, "metadata": metadata}
    except Exception as e:
        print(f"Error fetching stock data: {str(e)}")
        return {"success": False, "error": str(e)} 