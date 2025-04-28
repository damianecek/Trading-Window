from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import requests
import random
import hashlib
import datetime
import os
import re
import json
from bs4 import BeautifulSoup
import time
from concurrent.futures import ThreadPoolExecutor

# Initialize the sentiment analyzer
analyzer = SentimentIntensityAnalyzer()

# List of reputable financial news sources
NEWS_SOURCES = {
    "finance.yahoo.com": {
        "search_url": "https://finance.yahoo.com/quote/{}/news",
        "name": "Yahoo Finance",
        "class": "reliable",
        "weight": 1.0
    },
    "cnbc.com": {
        "search_url": "https://www.cnbc.com/quotes/{}/",
        "name": "CNBC",
        "class": "reliable",
        "weight": 1.0
    },
    "reuters.com": {
        "search_url": "https://www.reuters.com/finance/stocks/{}",
        "name": "Reuters",
        "class": "highly-reliable",
        "weight": 1.2
    },
    "bloomberg.com": {
        "search_url": "https://www.bloomberg.com/quote/{}",
        "name": "Bloomberg",
        "class": "highly-reliable",
        "weight": 1.2
    },
    "marketwatch.com": {
        "search_url": "https://www.marketwatch.com/investing/stock/{}",
        "name": "MarketWatch",
        "class": "reliable",
        "weight": 1.0
    }
}

# Create a cache for sentiment data to avoid repeated API calls
SENTIMENT_CACHE = {}
CACHE_TTL = 3600  # Cache time to live in seconds (1 hour)

def get_cached_sentiment(ticker):
    """Check if we have cached sentiment data for this ticker"""
    now = time.time()
    if ticker in SENTIMENT_CACHE:
        cache_time, data = SENTIMENT_CACHE[ticker]
        if now - cache_time < CACHE_TTL:
            return data
    return None

def cache_sentiment(ticker, data):
    """Cache sentiment data for this ticker"""
    SENTIMENT_CACHE[ticker] = (time.time(), data)

def get_news_articles(ticker, max_articles=10):
    """Fetch real news articles about a ticker from multiple sources"""
    print(f"Fetching news for {ticker}")
    
    all_articles = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    def fetch_from_source(source_domain, source_info):
        try:
            url = source_info["search_url"].format(ticker)
            print(f"Fetching from {url}")
            response = requests.get(url, headers=headers, timeout=5)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Extract headlines based on common patterns
                headlines = []
                
                # Look for article titles in various formats
                article_elements = soup.select('article h2, article h3, .headline, .title, h3.title, .article__headline')
                for element in article_elements[:5]:  # Limit to 5 per source
                    if element.text.strip():
                        headlines.append({
                            "headline": element.text.strip(),
                            "source": source_info["name"],
                            "weight": source_info["weight"],
                            "url": url
                        })
                
                return headlines
            else:
                print(f"Failed to fetch from {source_domain}: {response.status_code}")
                return []
        except Exception as e:
            print(f"Error fetching from {source_domain}: {str(e)}")
            return []
    
    # Use multithreading to fetch from multiple sources in parallel
    with ThreadPoolExecutor(max_workers=len(NEWS_SOURCES)) as executor:
        futures = {executor.submit(fetch_from_source, domain, info): domain 
                  for domain, info in NEWS_SOURCES.items()}
        
        for future in futures:
            try:
                articles = future.result()
                all_articles.extend(articles)
            except Exception as e:
                print(f"Error processing source: {str(e)}")
    
    # If we couldn't get any real articles, generate simulated ones
    if not all_articles:
        print("No real articles found, generating simulated ones")
        all_articles = generate_simulated_articles(ticker)
    else:
        print(f"Found {len(all_articles)} real articles")
        
    return all_articles[:max_articles]

def generate_simulated_articles(ticker):
    """Generate simulated news articles if real ones can't be fetched"""
    # Generate a deterministic but varied sentiment for each ticker using a hash
    ticker_hash = int(hashlib.md5(ticker.encode()).hexdigest(), 16) % 100
    
    # Create sentiment variations based on ticker hash
    sentiment_bias = (ticker_hash - 50) / 100  # Range from -0.5 to 0.5
    
    # Generate different headlines based on the ticker with varying sentiment
    headlines = [
        # Positive headlines
        f"Analysts upgrade {ticker} citing strong growth potential",
        f"{ticker} exceeds quarterly earnings expectations by 15%",
        f"New partnership announced for {ticker}, stock rallies",
        f"{ticker} expands into new markets, investors optimistic",
        f"Why {ticker} could be a top pick for 2023",
        
        # Negative headlines
        f"Investors concerned about {ticker}'s market position",
        f"{ticker} misses revenue targets, shares drop",
        f"Regulatory challenges ahead for {ticker}, analysts warn",
        f"Competition threatens {ticker}'s core business",
        f"{ticker} cuts guidance, citing economic headwinds",
        
        # Neutral headlines
        f"{ticker} reports Q2 results in line with expectations",
        f"Market awaits {ticker}'s upcoming product announcement",
        f"{ticker} maintains steady performance amid market fluctuations",
        f"What to watch for in {ticker}'s upcoming earnings",
        f"{ticker} restructures operations, impact unclear"
    ]
    
    # Select a subset of headlines with a bias based on the ticker
    selected_count = min(10, len(headlines))
    seed = ticker_hash  # Deterministic selection but different per ticker
    random.seed(seed)
    selected_headlines = random.sample(headlines, selected_count)
    
    # Generate dates
    today = datetime.date.today()
    dates = []
    for i in range(selected_count):
        days_ago = random.randint(0, 14)  # Last two weeks
        past_date = today - datetime.timedelta(days=days_ago)
        dates.append(past_date)
    
    # Sort dates in descending order (newest first)
    dates.sort(reverse=True)
    
    # Create simulated articles
    simulated_articles = []
    sources = ["Simulated Yahoo Finance", "Simulated CNBC", "Simulated MarketWatch", 
               "Simulated Reuters", "Simulated Bloomberg"]
               
    for i, headline in enumerate(selected_headlines):
        source = sources[i % len(sources)]
        simulated_articles.append({
            "headline": headline,
            "source": source,
            "weight": 0.8,  # Lower weight for simulated sources
            "url": "#",
            "date": dates[i].strftime("%Y-%m-%d")
        })
    
    return simulated_articles

def analyze_news_sentiment(ticker):
    """
    Analyze sentiment from news about a specific ticker
    Attempts to get real news, falls back to simulation if needed
    """
    try:
        # Check if we have cached data first
        cached_data = get_cached_sentiment(ticker)
        if cached_data:
            print(f"Using cached sentiment data for {ticker}")
            return cached_data
            
        # Get news articles (real or simulated)
        articles = get_news_articles(ticker)
        
        # Add current date to real articles
        today = datetime.date.today()
        
        # Analyze sentiment
        sentiments = []
        weighted_scores = []
        total_weight = 0
        
        for article in articles:
            # Get the headline and source
            headline = article["headline"]
            source = article["source"]
            weight = article.get("weight", 1.0)
            
            # Calculate sentiment score with VADER
            sentiment_score = analyzer.polarity_scores(headline)["compound"]
            
            # Apply source weight to the sentiment score
            weighted_score = sentiment_score * weight
            weighted_scores.append(weighted_score)
            total_weight += weight
            
            # Add the date if not present
            if "date" not in article:
                days_ago = len(sentiments)  # Spread out over recent days
                article_date = today - datetime.timedelta(days=days_ago)
                date_str = article_date.strftime("%Y-%m-%d")
            else:
                date_str = article["date"]
            
            sentiments.append({
                "headline": headline,
                "date": date_str,
                "source": source,
                "sentiment_score": round(sentiment_score, 2),
                "url": article.get("url", "#")
            })
        
        # Calculate the weighted average sentiment
        overall_sentiment = 0
        if total_weight > 0:
            overall_sentiment = sum(weighted_scores) / total_weight
        
        # Add overall sentiment to the response
        result = {
            "success": True, 
            "data": sentiments,
            "overall_sentiment": round(overall_sentiment, 2),
            "is_simulated": all(s["source"].startswith("Simulated") for s in sentiments),
            "source_count": len(set(s["source"] for s in sentiments))
        }
        
        # Cache the result
        cache_sentiment(ticker, result)
        
        return result
    except Exception as e:
        print(f"Error in sentiment analysis: {str(e)}")
        return {"success": False, "error": str(e)} 