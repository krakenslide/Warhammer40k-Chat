
# Warhammer40k Chat App

**User Authentication:** Users can register and log in to the application using their username, email, and password. The registration process checks for duplicate usernames and emails to ensure uniqueness.

**Avatar Selection:** After registering, users are prompted to set an avatar image for their profile. The application provides a selection of avatar images for users to choose from.

**Chat Interface:** Once logged in and with an avatar set, users can access a chat interface where they can view and send messages to other users. The chat interface likely displays a list of contacts and allows users to select a contact to start a conversation.

**Real-time Messaging:** The application uses Socket.IO for real-time messaging, enabling users to send and receive messages instantly without needing to refresh the page.

**Message Storage:** Messages sent between users are stored in a database, likely MongoDB, using Mongoose schemas. This allows users to access their message history and resume conversations across different sessions.

**User Management:** The application provides endpoints for managing users, including registering, logging in, setting avatars, and retrieving user information.

Overall, the application aims to provide a seamless and interactive chat experience for users, allowing them to communicate in real-time with other users while maintaining a user-friendly interface and robust user management system.



## Deployment

To run this project 

Install dependencies:
```bash
  cd chat-application
  npm install
```
Create a .env file in the project root and add the following variables:

```bash
  PORT=<server-port>
  MONGO_URL=<mongodb-connection-uri>
```

Start the server and client:

```bash
 npm run dev
 npm start
```
