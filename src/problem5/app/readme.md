# ExpressJS Backend Server with TypeScript and MongoDB

This repository contains a backend server implemented with ExpressJS and TypeScript, integrated with MongoDB for data persistence.

## Installation

1. **Clone the repository:**

2. **Install dependencies:**
    ```bash
    npm install
3. **Set up environment variables:**
    - Create a .env file in the root directory based on .env.example and provide necessary MongoDB connection string and other environment variables.

## Running the Server
1. To run the server in development mode:
    ```bash
    npm run dev

## API Endpoints
API Endpoints
1. Get Resources
    GET /api/resources

    Fetches a paginated list of resources.

    Query Parameters:

    page: Page number (default: 1)
    perPage: Number of items per page (default: 10)
2. Get Resource by ID
    GET /api/resources/:id

    Fetches a resource by its ID.

3. Create Resource
    POST /api/resources

    Creates a new resource.

    Request Body:

    json
    Copy code
    {
    "title": "Resource Title",
    "description": "Resource Description"
    }
4. Update Resource
    PUT /api/resources/:id

    Updates an existing resource by its ID.

    Request Body:

    json
    Copy code
    {
    "title": "Updated Title",
    "description": "Updated Description"
    }
5. Delete Resource
    DELETE /api/resources/:id

    Deletes a resource by its ID.