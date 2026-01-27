# Vapor-SearchWeb

> A modern, minimalist search platform built with React and TypeScript.

## 🛠️ Tech Stack & Architecture

- **React & TypeScript**: Built on a **SPA (Single Page Application)** architecture. Leverages strict type-checking to significantly enhance code reliability and long-term maintainability.
- **Redux Toolkit (RTK)**: Serves as the centralized state management solution. Efficiently handles complex data flows and caches asynchronous search results to ensure global data consistency.
- **Tailwind CSS & Shadcn/UI**: Utilizes utility-first CSS combined with Radix UI's accessibility standards. Features a high-performance component library with native dark mode support.

## ✨ Core Features

- **Global State Synchronization**：Implements seamless data persistence and cross-component state sharing via Redux.
- **Responsive Design**：Employs Tailwind's breakpoint system to provide an optimized user experience across all devices, from mobile phones to 4K displays.
- **High-Performance UI**：Delivers rapid-response interactive components, such as search bars and navigation tabs, powered by Shadcn/UI.

## 📂 Directory Structure

src/
├── api/ # API endpoint definitions and service layer
├── requests/ # Axios instances and interceptor configurations
├── components/ # Atomic UI components (Shadcn) & business-logic components
├── pages/ # Route-level page components (e.g., Home, Search Results)
├── routes/ # Centralized routing configuration (React Router)
├── store/ # Redux Toolkit (slices, store, and middleware)
├── hooks/ # Custom React hooks (e.g., useDebounce for search optimization)
└── types/ # Global TypeScript type definitions and interfaces

```

```
