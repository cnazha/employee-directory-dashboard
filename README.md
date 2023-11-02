# NextJS + Firebase + GraphQL Project

Welcome to the NextJS + Firebase + GraphQL project! This repository showcases an integration of Next.js with Firebase authentication and data storage, complemented by a GraphQL endpoint for optimized data fetching.

## Demo
Visit the [demo](https://employee-directory-dashboard.vercel.app/dashboard/employees) to see the project in action.
use the following credentials to login:
- email: admin@test.com
- password: Lebanon@2023

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Technologies](#technologies)
4. [Deployment](#deployment)
6. [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Installation
1. Create environment variables:

```bash
cp .env.example .env.local
```

2. Install the dependencies:

```bash
npm install
```

3. Generate the GraphQL schema and hooks:

```bash
npm run codegen
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure
All the source code is located in the `src/` directory. The project structure is as follows:
- `components/`: Contains all the React components.
- `app/`: Contains all the page components for Next.js.
- `graphql/`: Graphql queires and mutations.
- `gql/`: Contains the generated GraphQL schema and hooks.
- `config/`: Contains the configuration files for Firebase and Apollo.
- `lib/`: Contains the services (firebase).
- `hooks/`: Contains the custom React hooks.
- 
## Technologies

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Apollo](https://www.apollographql.com/)

## Deployment

This project is ready to be deployed on Vercel, Netlify, or any platform that supports Next.js.

## License

This project is licensed under the MIT License.

---

Thank you for checking out the project. If you found any bugs or have a feature request, please open an issue. Enjoy coding! 🚀
