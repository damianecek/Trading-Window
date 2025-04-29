import React, { useState } from 'react';

const SentimentAnalysis = ({ sentimentData }) => {
  sentimentData.is_simulated = undefined;
  sentimentData.overall_sentiment = undefined;
  const [expandedArticle, setExpandedArticle] = useState(null);

  // If no data or empty data, display a message
  if (!sentimentData || sentimentData.length === 0) {
    return <div className="text-center my-5">No sentiment data available</div>;
  }

  // Helper function to determine sentiment class
  const getSentimentClass = (score) => {
    if (score > 0.2) return 'text-success';
    if (score < -0.2) return 'text-danger';
    return 'text-warning';
  };

  // Helper function to get a verbal description of sentiment
  const getSentimentDescription = (score) => {
    if (score > 0.6) return 'Very Positive';
    if (score > 0.2) return 'Positive';
    if (score < -0.6) return 'Very Negative';
    if (score < -0.2) return 'Negative';
    return 'Neutral';
  };

  // Calculate overall sentiment score - either from the backend or calculated here
  const overallSentiment = sentimentData.overall_sentiment !== undefined
    ? sentimentData.overall_sentiment
    : sentimentData.reduce((acc, item) => acc + item.sentiment_score, 0) / sentimentData.length;

  const roundedScore = typeof overallSentiment === 'number' ? overallSentiment.toFixed(2) : '0.00';
  const sentimentClass = getSentimentClass(overallSentiment);

  // Check if data is simulated
  const isSimulated = sentimentData.is_simulated ||
    sentimentData.data?.some(item => item.source?.includes('Simulated'));

  // Get the actual data array
  const articles = sentimentData.data || sentimentData;

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Market Sentiment Analysis</h5>
          {isSimulated && (
            <span className="badge bg-secondary">Some data simulated</span>
          )}
        </div>
      </div>
      <div className="card-body">
        <div className="text-center mb-4">
          <div className={`sentiment-indicator p-3 rounded mb-3 ${sentimentClass}`} style={{
            background: overallSentiment > 0 ?
              `rgba(40, 167, 69, ${Math.min(Math.abs(overallSentiment), 1) * 0.3})` :
              `rgba(220, 53, 69, ${Math.min(Math.abs(overallSentiment), 1) * 0.3})`
          }}>
            <h4>Overall Sentiment: <span className={sentimentClass}>{roundedScore}</span></h4>
            <h5 className={sentimentClass}>{getSentimentDescription(overallSentiment)}</h5>
            <div className="progress" style={{ height: '10px' }}>
              <div
                className={`progress-bar ${overallSentiment > 0 ? 'bg-success' : 'bg-danger'}`}
                role="progressbar"
                style={{
                  width: `${Math.min(Math.abs(overallSentiment) * 100, 100)}%`,
                  marginLeft: overallSentiment > 0 ? '50%' : ''
                }}
                aria-valuenow={Math.abs(overallSentiment)}
                aria-valuemin="0"
                aria-valuemax="1">
              </div>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <small>Negative</small>
              <small>Neutral</small>
              <small>Positive</small>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">Recent News Headlines</h5>
            <span className="badge bg-primary">{articles.length} articles</span>
          </div>
          <div className="list-group">
            {articles.map((item, index) => (
              <div
                key={index}
                className="list-group-item"
                onClick={() => setExpandedArticle(expandedArticle === index ? null : index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">{item.headline}</h6>
                  <span className={`badge ${getSentimentClass(item.sentiment_score) === 'text-success' ? 'bg-success' :
                    getSentimentClass(item.sentiment_score) === 'text-danger' ? 'bg-danger' : 'bg-warning'} text-white`}>
                    {item.sentiment_score}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">{item.date}</small>
                  <small className="text-muted">
                    Source: {item.source || 'Unknown'}
                  </small>
                </div>

                {expandedArticle === index && item.url && item.url !== '#' && (
                  <div className="mt-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Read Full Article
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="sentiment-guide p-3 border rounded bg-light">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">Sentiment Analysis Info</h5>
          </div>
          <p className="text-muted mb-2 small">
            Sentiment analysis measures the emotional tone of news articles and social media about this stock.
            Our system analyzes multiple sources to identify positive or negative sentiment trends.
          </p>
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="p-2 bg-success bg-opacity-25 rounded text-center">
                <span className="text-success fw-bold">Positive: 0.2 to 1.0</span>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="p-2 bg-warning bg-opacity-25 rounded text-center">
                <span className="text-warning fw-bold">Neutral: -0.2 to 0.2</span>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="p-2 bg-danger bg-opacity-25 rounded text-center">
                <span className="text-danger fw-bold">Negative: -1.0 to -0.2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
