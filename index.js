const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// Function to check if the number is a prime number
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if the number is a perfect number
const isPerfect = (num) => {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
};

// Function to check if the number is Armstrong
const isArmstrong = (num) => {
  const digits = num.toString().split("");
  const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), digits.length), 0);
  return sum === num;
};

// Function to calculate digit sum
const digitSum = (num) => {
  return num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
};

//homepage
app.get("/", (req, res) => {
  res.status(200).json({
    message: "To use the API, try 'numberrandomfact.vercel.app/api/classify-number?number=371'.",
    note: "You can replace 371 with any number of your choice."
  })
})

// Define the new route for classifying the number
app.get("/api/classify-number", async (req, res) => {
  const number = req.query.number;

  // Check if the number is a valid number
  if (isNaN(number)) {
    return res.status(400).json({
      number: number,
      error: true
    });
  }

  const num = parseInt(number);

  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  if (num % 2 !== 0){
    properties.push("odd")
  } else {
    properties.push("even")
  };

  // Fetch fun fact from numbersapi.com
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math`);
    const funFact = response.data;

    const result = {
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties: properties,
      digit_sum: digitSum(num),
      fun_fact: funFact,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch fun fact from numbersapi.com"
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

