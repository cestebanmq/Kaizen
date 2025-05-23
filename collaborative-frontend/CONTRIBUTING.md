# Contributing to the Collaborative Futuristic Front-End

First off, thank you for considering contributing! Your help is essential for keeping it great.

This document provides guidelines for contributing to this project. Please read it carefully to ensure a smooth and effective contribution process.

## 1. Code of Conduct

We are committed to fostering an open and welcoming environment. While a formal Code of Conduct is being finalized, we expect all contributors to adhere to general principles of respect, professionalism, and collaboration. Please treat everyone with courtesy. Harassment or exclusionary behavior will not be tolerated.

(Placeholder: We plan to adopt the [Contributor Covenant](https://www.contributor-covenant.org/) or a similar Code of Conduct.)

## 2. How to Contribute

### Reporting Bugs

*   **Ensure the bug was not already reported** by searching on GitHub under Issues.
*   If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/your-repo/collaborative-frontend/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample or an executable test case** demonstrating the expected behavior that is not occurring.
*   Provide details about your environment (e.g., browser, operating system, Node.js version).

### Suggesting Enhancements

*   Open a new issue to discuss your enhancement idea.
*   Clearly describe the proposed enhancement, its benefits, and any potential drawbacks or considerations.
*   Be prepared to discuss your proposal with the project maintainers.

### Setting Up the Development Environment

Refer to the main `README.md` for detailed instructions on how to set up the development environment, including installing prerequisites and running the front-end and Socket.IO servers.

### Branching Strategy

*   **`main` Branch:** This is the primary branch representing the most stable version of the project. Direct pushes to `main` are typically restricted.
*   **Feature Branches:** All new features, bug fixes, and enhancements should be developed in separate branches.
    *   Branch names should be descriptive (e.g., `feat/new-editing-toolbar`, `fix/login-error`).
    *   Create your branch from the `main` branch: `git checkout -b feat/your-feature-name main`
*   **Hotfix Branches:** For critical bug fixes that need to be deployed quickly, a `hotfix/` branch may be created from `main`.

### Commit Message Guidelines

We aim to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This provides a standardized format that makes it easier to understand changes and automate changelog generation.

A typical commit message looks like:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

*   **Types:** `feat` (new feature), `fix` (bug fix), `docs` (documentation changes), `style` (code style changes, no functional impact), `refactor` (code changes that neither fix a bug nor add a feature), `perf` (performance improvements), `test` (adding missing tests or correcting existing tests), `chore` (build process, auxiliary tools, etc.).
*   **Scope (Optional):** A noun describing the section of the codebase affected (e.g., `auth`, `editor`, `comments`).
*   **Description:** Concise summary of the change in the present tense.

Example:
```
feat(editor): add support for bold text formatting
```
```
fix(auth): resolve issue with password reset link expiration

The password reset link was expiring prematurely due to a timezone mismatch.
This commit updates the token generation logic to use UTC.

Closes #123
```

### Pull Request (PR) Process

1.  Ensure your local `main` branch is up-to-date with the upstream `main` branch.
2.  Rebase your feature branch onto the latest `main` branch: `git rebase main`.
3.  Push your feature branch to your fork: `git push origin feat/your-feature-name`.
4.  Open a Pull Request (PR) against the `main` branch of the upstream repository.
5.  Provide a clear title and description for your PR, outlining the changes and linking to any relevant issues.
6.  Ensure your PR passes all automated checks (e.g., linting, tests, builds).
7.  Respond to any feedback or review comments from maintainers.
8.  Once approved, your PR will be merged into the `main` branch.

## 3. Coding Standards

### Code Style & Formatting

*   **ESLint & Prettier:** This project uses ESLint for identifying and reporting on patterns in JavaScript/TypeScript and Prettier for automated code formatting. Configuration files (`.eslintrc.js` or similar, `.prettierrc.js` or similar) are included in the project.
*   **Automatic Formatting:** It's highly recommended to configure your IDE to format code on save using Prettier. You can also run formatting manually:
    ```bash
    npm run lint # Check for linting issues
    npm run format # Format code with Prettier
    ```
*   Adhere to the established coding style and conventions used throughout the project.

### Specific Code Preferences

*   **TypeScript:** Embrace TypeScript's static typing. Use specific types where possible and avoid `any` unless absolutely necessary.
*   **React Functional Components:** Prefer functional components with Hooks over class components.
*   **Clarity & Readability:** Write code that is clear, readable, and well-commented where necessary (see `DOCUMENTATION_STRATEGY.md`).
*   **Modularity:** Break down complex components and logic into smaller, manageable modules.
*   **Accessibility:** Keep accessibility in mind for all UI components and interactions. Refer to `ACCESSIBILITY_GUIDELINES.md`.
*   **Performance:** Be mindful of performance implications. Refer to `PERFORMANCE_GUIDELINES.md`.

By following these guidelines, you help us maintain a high-quality, consistent, and collaborative codebase. Thank you for your contributions!
