import numpy as np
import pandas as pd
import ta


def add_technical_indicators(df):
    """
    Add technical indicators to the dataframe
    """
    try:
        # Convert to pandas DataFrame if it's a list of dictionaries
        if isinstance(df, list):
            df = pd.DataFrame(df)

        # Convert Date column to datetime if it exists
        if "Date" in df.columns:
            df["Date"] = pd.to_datetime(df["Date"])

        # Adjust window sizes based on data length
        data_length = len(df)

        # For very short periods (1d or 5d), use smaller windows
        if data_length <= 5:  # For 1d or 5d
            sma_window = min(5, data_length)
            rsi_window = min(5, data_length)
            df["SMA_50"] = ta.trend.sma_indicator(df["Close"], window=sma_window)
            df["RSI"] = ta.momentum.rsi(df["Close"], window=rsi_window)
        else:
            # Use standard windows for longer periods
            sma_window = min(50, data_length // 2)  # No more than half the data length
            rsi_window = min(14, data_length // 3)  # No more than a third of the data length
            df["SMA_50"] = ta.trend.sma_indicator(df["Close"], window=sma_window)
            df["RSI"] = ta.momentum.rsi(df["Close"], window=rsi_window)

        # MACD works with any length
        df["MACD"] = ta.trend.macd(df["Close"])

        # Handle NaN values for JSON serialization
        df = df.replace({np.nan: None})

        # Convert back to dictionary for API response
        df_dict = df.to_dict(orient="records")
        return {"success": True, "data": df_dict}
    except Exception as e:
        return {"success": False, "error": str(e)}
