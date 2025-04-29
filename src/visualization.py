import matplotlib.pyplot as plt

def plot_stock_data(df, ticker):
    plt.figure(figsize=(10, 5))
    plt.plot(df["Close"], label="Close Price", color="blue")
    plt.plot(df["SMA_50"], label="50-Day SMA", linestyle="--", color="orange")
    plt.legend()
    plt.title(f"{ticker} Stock Price with SMA")
    plt.show()
