from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import requests

analyzer = SentimentIntensityAnalyzer()

def analyze_news_sentiment(news_articles):
    sentiments = []
    for article in news_articles:
        sentiment_score = analyzer.polarity_scores(article["headline"])["compound"]
        sentiments.append((article["headline"], sentiment_score))
    return sentiments
