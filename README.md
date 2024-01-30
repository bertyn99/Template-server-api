# Template-server-api

This project is a template for creating a REST API with built-in features such as authentication, pagination, and session token management.

## Directory Structure

- `common/`: Contains utility functions like `successRes()` for sending successful responses.
- `config.js`: The configuration file for the project.
- `controllers/`: Contains controller files like `user.js` for handling user-related requests.
- `db/`: Contains files related to database connection (`connexion.js`) and models (`model/user.js`).
- `services/`: Contains service files like `userService.js`, `hashingService.js`, and `verifyToken.js` for user management, password hashing, and token verification respectively.
- `test/`: Contains test files like `endpoint.test.js` for testing the API endpoints.

## Current Functionality

- User Authentication: Users can sign up, log in, and log out. Authentication is handled using JWT tokens.
- Pagination: The API supports pagination for handling large amounts of data.
- Session Token Management: The API manages session tokens for logged-in users.

## Future Implementations

- Emailing Service: An emailing service will be added to send emails to users for various notifications.
- Enhanced Security: More security features will be added to protect user data and prevent unauthorized access,  better management jwt.
- 

## How to Run

To run this project, use the following command:

```sh
npm start