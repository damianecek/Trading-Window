# Project Structure for Trading Window

This document outlines the recommended project structure for the Trading Window application. Following this structure ensures consistency and makes it easier for contributors to navigate the codebase.

## Overview

The Trading Window project is organized as follows:

```
Trading-Window/
├── backend/                # Backend Python code
│   ├── api/                # API endpoints and business logic
│   │   ├── __init__.py
│   │   ├── data_ingestion.py
│   │   ├── sentiment_analysis.py
│   │   └── technical_analysis.py
│   ├── data/               # Data storage and access
│   │   ├── __init__.py
│   │   └── raw/                # Raw data storage
│   │       └── __init__.py
│   ├── app.py              # Main application entry point
│   └── requirements.txt    # Backend dependencies
├── config/                 # Configuration files
│   └── ...
├── data/                   # Data files (CSV, JSON, etc.)
│   └── ...
├── docs/                   # Documentation
│   ├── CODING_STANDARDS.md
│   ├── PROJECT_STRUCTURE.md
│   └── tasks.md
├── frontend/               # Frontend React code
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── services/       # API client and other services
│   │   └── styles/         # CSS and styling
│   ├── package.json        # Frontend dependencies
│   └── ...
├── notebooks/              # Jupyter notebooks for analysis
│   └── ...
├── tests/                  # Test files
│   ├── backend/            # Backend tests
│   │   └── ...
│   └── frontend/           # Frontend tests (if not in frontend/src)
│       └── ...
├── .editorconfig           # Editor configuration
├── .eslintrc.json          # ESLint configuration (in frontend/)
├── .prettierrc             # Prettier configuration (in frontend/)
├── pyproject.toml          # Black configuration
├── setup.cfg               # Flake8 and isort configuration
├── CONTRIBUTING.md         # Contribution guidelines
├── README.md               # Project overview
└── requirements.txt        # Development dependencies
```

## Directory Descriptions

### Backend

The `backend/` directory contains all Python code for the server-side application:

- `api/`: Contains the API endpoints and business logic
  - `data_ingestion.py`: Functions for importing and processing data
  - `sentiment_analysis.py`: Sentiment analysis algorithms
  - `technical_analysis.py`: Technical indicators and analysis
- `data/`: Data access layer and storage utilities
  - `raw/`: Raw data storage for stock data and other unprocessed data
- `app.py`: Main Flask application entry point

### Frontend

The `frontend/` directory contains all JavaScript/React code for the client-side application:

- `public/`: Static assets like HTML, images, and fonts
- `src/`: Source code
  - `components/`: React components organized by feature
  - `context/`: React Context API providers and consumers
  - `hooks/`: Custom React hooks
  - `services/`: API client and other service utilities
  - `styles/`: CSS and styling files
  - `utils/`: Utility functions and helpers

### Configuration

The `config/` directory contains configuration files for different environments (development, testing, production).

### Data

The `data/` directory contains data files used by the application, such as CSV files, JSON files, etc.

### Documentation

The `docs/` directory contains project documentation:

- `CODING_STANDARDS.md`: Coding standards and best practices
- `PROJECT_STRUCTURE.md`: This document
- `tasks.md`: Project tasks and roadmap

### Tests

The `tests/` directory contains test files for both backend and frontend code.

### Notebooks

The `notebooks/` directory contains Jupyter notebooks for data analysis and exploration.

## Migration from Old Structure

If you're working with code in the old `src/` directory, please migrate it to the appropriate location in the new structure:

- `src/app.py` → `backend/app.py`
- `src/data_ingestion.py` → `backend/api/data_ingestion.py`
- `src/sentiment_analysis.py` → `backend/api/sentiment_analysis.py`
- `src/technical_analysis.py` → `backend/api/technical_analysis.py`
- `src/visualization.py` → `backend/api/visualization.py`

## Best Practices

1. **Keep related files together**: Group files by feature rather than by type
2. **Maintain separation of concerns**: Keep business logic separate from data access and presentation
3. **Use relative imports**: Use relative imports within packages to avoid hardcoding package names
4. **Follow naming conventions**: Use consistent naming for files and directories as outlined in the coding standards
5. **Document your code**: Add docstrings and comments to explain complex logic
