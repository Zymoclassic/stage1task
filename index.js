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


// Define the new route for classifying the number
app.get("/api/classify-number", (req, res) => {
  const number = req.query.number;

  if (isNaN(number)) {
    return res.status(400).json({
      number: number,
      error: true
    });
  }

  const num = parseInt(number);

  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  if (num % 2 !== 0) properties.push("odd");

  const funFact = `${num} is an ${properties.includes("odd") ? "odd" : "even"} number`;

  const response = {
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(num),
    properties: properties,
    digit_sum: digitSum(num),
    fun_fact: funFact,
  };

  res.json(response);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
