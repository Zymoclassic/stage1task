# Number Classifier API

This is a simple Express API that classifies a number and provides useful information about it. The API accepts a number as a query parameter and returns a JSON response with details such as whether the number is prime, perfect, or Armstrong, along with the sum of its digits and a fun fact fetched from `numbersapi.com`.

## Features

- Classifies a number and determines if it's prime, perfect, or Armstrong.
- Calculates the sum of the digits of the number.
- Fetches a math-related fun fact for the number from `numbersapi.com`.
- Returns the results in a clean JSON format.

## API Endpoint

### `GET /`

This endpoint is the homepage and displays instruction on how to generate number fact.

### `GET /api/classify-number?number=<number>`

This endpoint takes a number as a query parameter and returns a JSON response with the classification details.

#### Query Parameters:

- `number`: The number to classify. This should be an integer.

#### Response Format:

**Success (200 OK)**:
```json
{
  "number": <number>,
  "is_prime": <true/false>,
  "is_perfect": <true/false>,
  "properties": ["<property1>", "<property2>"],
  "digit_sum": <digit_sum>,
  "fun_fact": "<fun_fact>"
}
```

**Error (400 Bad Request)**:
If the `number` parameter is missing or invalid, the response will be:
```json
{
  "number": "<invalid_value>",
  "error": true
}
```

**Error (500 Internal Server Error)**:
If the API fails to fetch the fun fact from `numbersapi.com`, the response will be:
```json
{
  "error": "Failed to fetch fun fact from numbersapi.com"
}
```

## Example Usage

### Example 1: Valid Number

Request:

```
GET https://numberrandomfact.vercel.app/api/classify-number?number=371
```

Response:

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is a narcissistic number."
}
```

### Example 2: Invalid Number

Request:

```
GET http://numberrandomfact.vercel.app/api/classify-number?number=abc
```

Response:

```json
{
  "number": "abc",
  "error": true
}
```

## Installation

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Zymoclassic/stage1task.git
   ```

2. Install dependencies:

   ```bash
   cd stage1task
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. The API will be available at `http://localhost:3000`.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for building the API.
- **Axios**: Promise-based HTTP client for making requests to external APIs.
- **NumbersAPI**: External API used to fetch math-related fun facts for the number.

## License

This project is licensed under the ISC License.

## Acknowledgments

- [NumbersAPI](http://numbersapi.com/) for providing math-related facts.
- Express.js for providing a simple framework for building APIs.