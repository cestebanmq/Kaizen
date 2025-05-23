# Collaborative Futuristic Front-End Application

## 1. Project Overview

This project is a collaborative front-end application designed to provide a futuristic and innovative user experience for real-time teamwork. It features simultaneous text editing, shared presence indicators, commenting, and aims for high performance and accessibility across various devices.

The application is built with a modern technology stack, emphasizing a mobile-first approach and a clean, minimalist aesthetic with dark mode by default.

## 2. Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   **Node.js:** Ensure you have Node.js installed (version 18.x or later recommended). You can download it from [nodejs.org](https://nodejs.org/).
*   **npm or Yarn:** npm (Node Package Manager) comes with Node.js. Alternatively, you can use Yarn.

### Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd collaborative-frontend
    ```
2.  **Install Front-End Dependencies:**
    Navigate to the `collaborative-frontend` directory and install the necessary packages:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Install Socket.IO Server Dependencies:**
    Navigate to the `socket-server` directory (located at the root of the repository, alongside `collaborative-frontend`) and install its dependencies:
    ```bash
    cd ../socket-server 
    npm install
    cd ../collaborative-frontend # Navigate back to the frontend directory
    ```

### Running the Application

To run the complete application, you need to start both the Next.js front-end development server and the Socket.IO server.

1.  **Start the Socket.IO Server:**
    Open a terminal, navigate to the `socket-server` directory, and run:
    ```bash
    cd ../socket-server
    npm run dev 
    ```
    The Socket.IO server will typically start on `http://localhost:3001`.

2.  **Start the Next.js Front-End Development Server:**
    Open another terminal, navigate to the `collaborative-frontend` directory, and run:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The Next.js application will typically start on `http://localhost:3000`. Open this URL in your browser.

## 3. Project Structure

A brief overview of the main directories:

*   **`collaborative-frontend/`**: Contains the Next.js front-end application.
    *   **`src/app/`**: Core application routes, layouts, and global styles (using Next.js App Router).
    *   **`src/components/`**: Reusable React components.
        *   `ui/`: General-purpose UI elements (e.g., Button).
        *   `layout/`: Components related to page structure.
    *   **`src/lib/`**: Utility functions, helper modules (e.g., `socket.ts` for Socket.IO client).
    *   **`public/`**: Static assets directly served.
*   **`socket-server/`**: Contains the standalone Node.js Express server for Socket.IO real-time communication.
    *   **`src/`**: TypeScript source code for the server.
*   **Root Directory (Project Level Markdown Documents):**
    *   Contains high-level project planning and guideline documents.

## 4. Key Project Documents

The following documents provide detailed information about various aspects of the project. They are located in the root directory of the repository:

*   **`PROJECT_SCOPE.md`**: Outlines the project's scope, core features, target users, and overall goals.
*   **`TECHNOLOGY_STACK.md`**: Details the technology choices for the front-end and back-end components, along with justifications.
*   **`DESIGN_GUIDELINES.md`**: Provides guidelines for the UI/UX design, including mobile-first principles, aesthetics, and key screen descriptions.
*   **`USABILITY_TESTING_PLAN.md`**: Describes the strategy for usability testing, including goals, methods, target users, and metrics.
*   **`PERFORMANCE_GUIDELINES.md`**: Outlines strategies and best practices for optimizing application performance.
*   **`ACCESSIBILITY_GUIDELINES.md`**: Details standards and best practices for ensuring the application is accessible (WCAG 2.1 AA).

## 5. Technology Stack Overview

*   **Front-End:**
    *   **Framework/Library:** React (with Next.js 13+ App Router)
    *   **Language:** TypeScript
    *   **Styling:** Tailwind CSS
    *   **State Management:** Zustand
    *   **Real-Time Communication Client:** Socket.IO Client
*   **Back-End (for Real-Time):**
    *   **Framework:** Node.js with Express
    *   **Language:** TypeScript
    *   **Real-Time Communication Server:** Socket.IO
*   **Development Tools:**
    *   ESLint, Prettier (for code quality and formatting)

This README provides a starting point for understanding and working with the project. For more detailed information, please refer to the documents listed in Section 4.
