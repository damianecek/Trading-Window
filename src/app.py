from src.data_ingestion import fetch_stock_data
from src.technical_analysis import add_technical_indicators
from src.visualization import plot_stock_data

# User Input
ticker = input("Enter stock ticker (e.g., AAPL, TSLA): ").upper()

# Fetch Data
df = fetch_stock_data(ticker)

# Add Indicators
df = add_technical_indicators(df)

# Display Results
plot_stock_data(df, ticker)
