import ta

def add_technical_indicators(df):
    df["SMA_50"] = ta.trend.sma_indicator(df["Close"], window=50)
    df["RSI"] = ta.momentum.rsi(df["Close"], window=14)
    df["MACD"] = ta.trend.macd(df["Close"])
    return df
