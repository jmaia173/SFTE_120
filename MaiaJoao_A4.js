const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask for a number
const askForNumber = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(parseInt(answer)); // Converts input to an integer
    });
  });
};

// Function to ask for a string
const askForString = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer); // Returns the string as is
    });
  });
};

// Function to ask for a boolean (true/false)
const askForBoolean = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase() === 'true'); // Converts 'true'/'false' to boolean
    });
  });
};

// Main function to ask for inputs and perform the operations
const main = async () => {
  // Ask user for inputs
  let a = await askForNumber("Enter a value for 'a' (number): ");
  let b = await askForNumber("Enter a value for 'b' (number): ");
  let c = await askForString("Enter a value for 'c' (string): ");
  let d = await askForBoolean("Enter a value for 'd' (true/false): ");
  let e = await askForNumber("Enter a value for 'e' (number): ");

  // Demonstrating 'if', 'else', and 'else if'
  console.log("\nDemonstrating if, else, and else if:");
  if (a > b) {
    console.log("a is greater than b");
  } else if (a === b) {
    console.log("a is equal to b");
  } else {
    console.log("a is less than b");
  }

  // Demonstrating 'switch' statement
  console.log("\nDemonstrating switch:");
  switch (a) {
    case 5:
      console.log("a is 5");
      break;
    case 10:
      console.log("a is 10");
      break;
    default:
      console.log("a is neither 5 nor 10");
  }

  // Demonstrating comparison operators: ==, ===, !=, !==, >, <, >=, <=
  console.log("\nDemonstrating comparison operators:");
  console.log("a == c:", a == c); // == (loose equality)
  console.log("a === c:", a === c); // === (strict equality)
  console.log("a != b:", a != b); // != (not equal)
  console.log("a !== c:", a !== c); // !== (strict not equal)
  console.log("a > b:", a > b); // greater than
  console.log("a < b:", a < b); // less than
  console.log("a >= b:", a >= b); // greater than or equal to
  console.log("a <= b:", a <= b); // less than or equal to

  // Demonstrating ternary operator '?'
  console.log("\nDemonstrating ternary operator:");
  let result = a > b ? "a is greater than b" : "a is not greater than b";
  console.log(result);

  // Demonstrating logical operators: &&, ||, !
  console.log("\nDemonstrating logical operators:");
  console.log("d && e:", d && e); // AND
  console.log("d || e:", d || e); // OR
  console.log("!d:", !d); // NOT

  // Close the readline interface after all input and output
  rl.close();
};

// Run the main function
main();