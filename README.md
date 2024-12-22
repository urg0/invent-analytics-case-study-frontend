# Invent Analytics Case Study - Frontend

A modern, type-safe React application built with Vite, TypeScript, and TailwindCSS.

*NOTE: Please start with the [Backend](https://github.com/urg0/invent-analytics-case-study-backend) set-up first and make sure that backend and database is running without any problem

## 🚀 Features

- ⚡️ **Lightning Fast HMR** with [Vite](https://vitejs.dev/)
- 💪 **Type Safety** with [TypeScript](https://www.typescriptlang.org/)
- 🎨 **Styling** with [TailwindCSS](https://tailwindcss.com/)
- 🧩 **UI Components** with [shadcn/ui](https://ui.shadcn.com/)
- 🛣️ **Routing** with [React Router](https://reactrouter.com/)
- 📏 **Code Quality** with [ESLint](https://eslint.org/)
- 🎯 **Absolute Imports** with `@` prefix

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v18 or higher)
- Yarn (v1.22 or higher)

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone <git@github.com:urg0/invent-analytics-case-study-frontend.git>
   cd my-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

## 🚀 Development

To start the development server:

```bash
yarn dev
```

This will start the application in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🏗️ Build

To create a production build:

```bash
yarn build
```

To preview the production build:

```bash
yarn preview
```

## 🧪 Linting

To run the linter:

```bash
yarn lint
```

## 📚 Tech Stack

### Core

- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

### Styling

- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind CSS classes without conflicts

### Data Fetching

- [TanStack Query](https://tanstack.com/query) - Powerful asynchronous state management
- [Axios](https://axios-http.com/) - Promise based HTTP client

### Routing

- [React Router](https://reactrouter.com/) - Declarative routing for React

### UI Components

- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide Icons](https://lucide.dev/) - Beautiful and consistent icons

### Development Tools

- [ESLint](https://eslint.org/) - Pluggable JavaScript linter
- [TypeScript ESLint](https://typescript-eslint.io/) - TypeScript support for ESLint
- [Autoprefixer](https://autoprefixer.github.io/) - Parse CSS and add vendor prefixes
- [PostCSS](https://postcss.org/) - A tool for transforming CSS with JavaScript

## 📁 Project Structure

```
.
├── dist/              # Build output directory
├── node_modules/      # Project dependencies
├── public/            # Static assets
└── src/
    ├── components/    # Reusable UI components
    ├── config/        # Configuration files
    ├── layouts/       # Layout components
    ├── lib/           # Library utilities
    ├── modules/       # Feature modules
    │   ├── book/      # Book-related features
    │   ├── borrow/    # Borrowing-related features
    │   └── user/      # User-related features
    └── pages/         # Application pages
├── .env-example       # Environment variables example
├── .eslintrc.json    # ESLint configuration
├── .gitignore        # Git ignore rules
├── components.json    # shadcn/ui components config
├── index.html        # HTML entry point
├── package.json      # Project dependencies and scripts
├── postcss.config.js # PostCSS configuration
├── README.md         # Project documentation
├── tailwind.config.js # TailwindCSS configuration
├── tsconfig.app.json # TypeScript app configuration
├── tsconfig.node.json # TypeScript node configuration
├── vite.config.ts    # Vite configuration
└── yarn.lock         # Yarn lock file
```

## 🔧 Configuration

### TypeScript

TypeScript configuration can be found in `tsconfig.json`. The project uses strict mode and includes paths configuration for absolute imports.

### TailwindCSS

TailwindCSS configuration can be found in `tailwind.config.js`. The project includes custom theme extensions and plugin configurations.

## 📝 Notes

- This project uses [Radix UI](https://www.radix-ui.com/) primitives for accessible component development
- State management is handled through React Query for server state and React's built-in hooks for local state
- The project follows a component-first architecture with modular, reusable components
