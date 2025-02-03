require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;

  
// Middlewares
app.use(cors());
app.use(express.json());


// Function to check if a number is prime
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if a number is perfect
const isPerfect = (num) => {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
};

// Function to check if a number is Armstrong
const isArmstrong = (num) => {
  const digits = num.toString().split("");
  const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), digits.length), 0);
  return sum === num;
};

// Function to calculate digit sum
const digitSum = (num) => {
  return num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
};

// Define the random facts API
app.get("/api/classify-number?number=371", (req, res) => {
  const number = parseInt(req.query.number);

  const properties = [];
  if (isArmstrong(number)) properties.push("armstrong");
  if (number % 2 !== 0) properties.push("odd");

  const funFact = `${number} is an ${properties.includes("odd") ? "odd" : "even"} number`;

  const response = {
    number: number,
    is_prime: isPrime(number),
    is_perfect: isPerfect(number),
    properties: properties,
    digit_sum: digitSum(number),
    fun_fact: funFact,
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
