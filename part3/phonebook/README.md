# Phonebook API

A simple RESTful API for managing a phonebook. Built with Node.js and Express.

## Features

- Add, view, update, and delete contacts
- Each contact has a name and phone number
- JSON-based API

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```bash
git clone https://github.com/yourusername/phonebook-api.git
cd phonebook-api
npm install
```

### Running the Server

```bash
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | /api/persons     | List all contacts   |
| GET    | /api/persons/:id | Get a contact by ID |
| POST   | /api/persons     | Add a new contact   |
| PUT    | /api/persons/:id | Update a contact    |
| DELETE | /api/persons/:id | Delete a contact    |
| GET    | /info            | Get phonebook info  |

### Example Contact

```json
{
  "id": 1,
  "name": "Arto Hellas",
  "number": "040-123456"
}
```

## Environment Variables

- `PORT`: Server port (default: 3001)
- `MONGODB_URI`: MongoDB connection string (if using database)

## License

ISC
