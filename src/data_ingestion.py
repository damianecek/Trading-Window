import yfinance as yf
import pandas as pd

def fetch_stock_data(ticker, period="24mo"):
    stock = yf.Ticker(ticker)
    data = stock.history(period=period)
    data.to_csv(f"../data/raw/{ticker}.csv")
    return data
