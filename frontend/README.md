# Trading Window Frontend

This is the frontend application for the Trading Window project. It's built with React and provides a user interface for stock analysis and trading.

## Project Structure

The frontend is organized as follows:

- `public/`: Static assets like HTML, images, and fonts
- `src/`: Source code
  - `components/`: React components organized by feature
  - `context/`: React Context API providers and consumers
  - `hooks/`: Custom React hooks
  - `services/`: API client and other service utilities
  - `styles/`: CSS and styling files
  - `utils/`: Utility functions and helpers

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`

### Development

To start the development server:

```bash
npm start
```

This will start the application at http://localhost:3000.

### Building for Production

To build the application for production:

```bash
npm run build
```

This will create a `build` directory with the production-ready application.

### Code Quality

The project uses ESLint and Prettier for code quality and formatting:

- To lint the code: `npm run lint`
- To fix linting issues: `npm run lint:fix`
- To format the code: `npm run format`

### Bundle Analysis

To analyze the bundle size:

```bash
npm run analyze
```

## Dependencies

- React: UI library
- Recharts: Charting library
- Bootstrap: CSS framework
- Axios: HTTP client

## Contributing

Please follow the coding standards and best practices outlined in the project's CODING_STANDARDS.md file.
