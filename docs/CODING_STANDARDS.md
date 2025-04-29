# Coding Standards for Trading Window

This document outlines the coding standards and best practices for the Trading Window project. Following these standards ensures consistency across the codebase and makes it easier for contributors to work together.

## Python Standards

### Code Formatting

- **Line Length**: Maximum line length is 100 characters
- **Indentation**: 4 spaces (no tabs)
- **Quotes**: Prefer double quotes for strings, but use single quotes for strings containing double quotes
- **Docstrings**: Use triple double quotes for docstrings
- **Imports**: Group imports in the following order:
  1. Standard library imports
  2. Related third-party imports
  3. Local application/library specific imports
- **Whitespace**: Follow PEP 8 guidelines for whitespace

### Naming Conventions

- **Functions and Variables**: Use `snake_case` for function and variable names
- **Classes**: Use `PascalCase` for class names
- **Constants**: Use `UPPER_CASE` for constants
- **Private Methods/Variables**: Prefix with a single underscore (e.g., `_private_method`)
- **Module-level Dunder Names**: Place at the top of the file (e.g., `__all__`, `__version__`)

### Type Hints

- Use type hints for all function parameters and return values
- Use `Optional[Type]` for parameters that can be None
- Use `Union[Type1, Type2]` for parameters that can be multiple types
- Use `List`, `Dict`, `Tuple`, etc. from the `typing` module

### Docstrings

- Use Google-style docstrings
- Include descriptions for all parameters, return values, and exceptions
- Example:
  ```python
  def function_name(param1: str, param2: int) -> bool:
      """Short description of the function.
      
      Longer description if needed.
      
      Args:
          param1: Description of param1
          param2: Description of param2
          
      Returns:
          Description of return value
          
      Raises:
          ValueError: When param1 is empty
      """
  ```

## JavaScript/React Standards

### Code Formatting

- **Line Length**: Maximum line length is 100 characters
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Use single quotes for strings
- **Semicolons**: Use semicolons at the end of statements
- **Trailing Commas**: Use trailing commas in multiline object literals and arrays
- **Whitespace**: Follow ESLint and Prettier configurations

### Naming Conventions

- **Variables and Functions**: Use `camelCase` for variables and functions
- **Components**: Use `PascalCase` for React components
- **Constants**: Use `UPPER_CASE` for constants
- **Files**: Use `PascalCase` for component files, `camelCase` for utility files

### React Best Practices

- Use functional components with hooks instead of class components
- Keep components small and focused on a single responsibility
- Use destructuring for props
- Use the React Context API for state that needs to be accessed by many components
- Use prop-types or TypeScript for type checking

### JavaScript Best Practices

- Use ES6+ features (arrow functions, template literals, destructuring, etc.)
- Avoid using `var`, prefer `const` and `let`
- Use async/await for asynchronous code
- Use array and object spread operators for immutability

## CSS/SCSS Standards

- Use BEM (Block Element Modifier) naming convention
- Use descriptive class names
- Avoid using IDs for styling
- Use variables for colors, fonts, and other repeated values
- Keep selectors as simple as possible

## Git Workflow

- Create a new branch for each feature or bug fix
- Keep commits small and focused
- Write clear commit messages
- Rebase your branch on the latest main before submitting a pull request
- Squash commits before merging if necessary

## Testing Standards

- Write tests for all new features and bug fixes
- Aim for high test coverage
- Test both happy paths and edge cases
- Use descriptive test names that explain what is being tested
