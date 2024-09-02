# Atlas Tech Kanban - Frontend Project

![Appercu](/frontend/public/Capture_dark.png);

## Description

This project is a frontend developed with Next.js, TypeScript et Tailwind CSS.
The application is designed to provide a responsive and modern user interface for an advanced Kanban board, aimed at helping engineering teams to manage tasks efficiently.

### Project Objectives

This application is designed on behalf of Atlas Tech Corp Ltd who have expressed the need for an advanced Kanban board application to help their teams manage tasks efficiently.
The application must support typical Kanban functionality such as :

- Creating, updating and moving tasks across different columns (e.g. To Do, In Progress, Completed).
- Additional functionality such as task filtering and sorting.
- Real-time collaboration, including task threads.

## Installation

To install and run this project locally, follow these steps:

1. **Clone the repository :**

   ```bash
   git clone https://github.com/Richouf95/atlas-tech-kanban.git
   cd frontend
   ```

2. **Installing dependencies :**

   ```bash
   npm install
   ```

3. **Configuring environment variables :**

````bash
GOOGLE_CLIENT_ID=<"Key">

GOOGLE_CLIENT_SECRET=<"key">

NEXTAUTH_URL=<"Key">

AUTH_SECRET=<"Key">

MONGODB_URI=<"Key">

NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY=<"Key">

NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=<"Key">

NEXT_PUBLIC_API_DOMAIN=<"Key">
````

## Launch the project locally

````bash
npm install
````

## Pages

Here are the different pages of the application:

- Home
- Signin
- Signup
- Dashboard
- Dashboard/board/:boardId
- Dashboard/project/:projectId
- Dashboard/project/:projectId/board/:boardId

## Dépendances

````bash
- **@auth/mongodb-adapter** : Adapter to connect NextAuth.js to MongoDB.
- **@liveblocks/client** : Client to manage real-time operations with Liveblocks.
- **@liveblocks/node** : Node.js package for real-time operations with Liveblocks.
- **@liveblocks/react** : Liveblocks integration for React to manage real-time shared states.
- **@liveblocks/react-comments**: Real-time discussion components for React with Liveblocks.
- **@liveblocks/react-ui**: User interface components for real-time applications with Liveblocks.
- mongodb** : MongoDB driver for Node.js.
- mongoose**: ODM (Object Data Modeling) for MongoDB and Node.js.
- react-redux** : Links between Redux and React.
- tailwindcss**: CSS framework utility for rapid design creation.
- sass**: Compiler for SCSS files in CSS.
- **sortablejs**: Library for making lists and elements sortable.
- uniqid**: Unique identifier generator.
````

## Notes

Several planned features have not yet been implemented.

These include

- **Offline mode**: Functionality allowing the application to be used without an internet connection.
- **Notifications**: Real-time notification system to inform users of important updates.
- **Mailings**: Sends emails for alerts, updates or invitations.
- **Security enhancements**: Integration of additional measures to strengthen application security, including management of regular data backups.
