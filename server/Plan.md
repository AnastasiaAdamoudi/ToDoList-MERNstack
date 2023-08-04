Models folder: How the database is structured (schema) and how the data is stored in the database (model)
Routes folder: How the data is retrieved from the database and how the data is sent to the database (routes)
Controllers folder: How the data is handled (controllers) and how the data is sent to the client (response)


CRUD operations:

- Create (POST): Creating a new todo item.

- Read (GET): Retrieving todo items.

- Update (PATCH): Editing and marking todos as complete.

- Delete (DELETE): Removing a todo item.


Custom middleware for error handling and validation:

- Error handling: If there is an error, the server will respond with an error message.
    - Error in the database: incorrect data type, missing data, incorrect data format, etc.
    - Error in the server: server is down, server is not responding, etc.
    - Error in the client: client is not connected to the internet, client is not responding, etc.

- Validation: If the user input is invalid, the server will respond with an error message.
    - Invalid input: incorrect data type, missing data, incorrect data format, etc.
    - Invalid todo: todo does not exist, todo is not found, etc.
    - Invalid request: request is not found, request is not allowed, etc.
    - Invalid route: route is not found, route is not allowed, etc.