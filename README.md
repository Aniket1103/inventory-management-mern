# Inventory Management System

The Inventory Management System is a web application that allows managers and assistants to manage and view inventory items. It provides different functionalities based on the user roles, allowing the manager to add or remove inventory items and approve requests, while the assistant can only view the inventory, or request to add an inventory item.

## Features

- User Management:
  - The Manager can add or remove inventory items.
  - The Assistant can only view the inventory items.

- Menu Options:
  - Three menu options provided for the manager: Dashboard, Analytics, and Requests.
  - Two menu options provided for the assistant: Dashboard and Analytics.
  - The Manager has an additional menu option "Requests" to view all the requests for inventory items.
  - The Manager can approve the requests in the "Requests" section.

- Analytics:
  - The Analytics tab shows visual representations of the inventory items present and insights about them.

- Request and Approval System:
  - The Assistant can request to add an inventory item, which can be later approved by the manager.
  - Once approved, the item will be listed on the Dashboard page of inventory items.

- Authentication:
  - Login, register, and logout options are provided.
  - JWT authentication is implemented for secure access.

- Easy Access:
  - A "Continue as Manager" option is provided on the login page for ease of access for managers.
  - The logout option is available on the right side of the navbar, and clicking the profile icon displays the logout dropdown.

## Tech Stack

- Stack: MERN (MongoDB, Express.js, React.js, Node.js)
- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB
- Deployment:
  - Frontend is deployed on [Netlify](https://inventory-management-mern.netlify.app/)
  - Backend is deployed on [Render](https://inventory-management-quhz.onrender.com/)

## Folder Structure

```
root/
  |- client/
  |   |- src/
  |   |   |- components/
  |   |   |- App.jsx
  |   |   |- main.jsx
  |   |   |- ...
  |   |- ...
  |
  |- server/
  |   |- config/
  |   |- controllers/
  |   |- middleware/
  |   |- models/
  |   |- routes/
  |   |- ...
  |
  |- ...
```

## Steps to Run Locally

1. Clone the repository to your local machine.
2. Install Node.js and MongoDB if not already installed.
3. Navigate to the "client" directory and run the following commands:
   ```
   npm install
   npm run dev
   ```
4. The frontend should be running on `http://localhost:5173`.
5. Next, navigate to the "server" directory and run the following commands:
   ```
   npm install
   npm run dev
   ```
6. The backend server should be running on `http://localhost:4000`.
7. Make sure MongoDB is running locally or update the MongoDB connection URL in the server configuration if using a remote MongoDB database.

Now you can access the Inventory Management System by opening `http://localhost:5173` in your web browser.

## Sample Assistant and Manager Credentials

- Assistant:
  - Email: assistant1@gmail.com
  - Password: assistant1pass

- Manager:
  - Email: manager1@gmail.com
  - Password: manager1pass

Feel free to explore the Inventory Management System and manage your inventory items efficiently!