# Contributing to Trading Window

Thank you for considering contributing to Trading Window! This document outlines the process for contributing to the project and the standards we expect.

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We aim to foster an inclusive and welcoming community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/Trading-Window.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Set up the development environment:
   - Backend: `pip install -r requirements.txt`
   - Frontend: `cd frontend && npm install`

## Development Workflow

### Backend Development

- Follow PEP 8 style guidelines with the modifications specified in our configuration files
- Use type hints for all function parameters and return values
- Write docstrings for all functions, classes, and modules
- Run linting and formatting tools before committing:
  ```bash
  flake8 backend
  black backend
  isort backend
  ```

### Frontend Development

- Follow the ESLint and Prettier configurations
- Use functional components and hooks instead of class components
- Keep components small and focused on a single responsibility
- Run linting and formatting tools before committing:
  ```bash
  cd frontend
  npm run lint
  npm run format
  ```

## Testing

- Write tests for all new features and bug fixes
- Ensure all tests pass before submitting a pull request
- Backend tests: `pytest tests/`
- Frontend tests: `cd frontend && npm test`

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the documentation if you're changing functionality
3. Make sure your code passes all tests and linting checks
4. Submit a pull request to the `main` branch
5. The PR should have a clear title and description explaining the changes

## Code Structure

- Backend:
  - `backend/api/`: API endpoints and business logic
  - `backend/data/`: Data access and storage
  - `backend/app.py`: Main application entry point

- Frontend:
  - `frontend/src/components/`: React components
  - `frontend/src/services/`: API client and other services
  - `frontend/src/styles/`: CSS and styling

## Coding Standards

### Python

- Use Black for code formatting
- Sort imports with isort
- Follow type hinting best practices
- Write comprehensive docstrings

### JavaScript/React

- Use ESLint and Prettier for code formatting
- Follow React best practices
- Use modern JavaScript features (ES6+)
- Document complex functions and components

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

## License

By contributing, you agree that your contributions will be licensed under the project's license.
