const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question("Is it snowing? (yes/no): ", function(answer) {

  const snow = answer.toLowerCase() === "yes"; 

  if (snow) {
    console.log("There is no class");
  } else {
    console.log("There is class");
  }


  rl.question("Enter your grade (0-100): ", function(gradeInput) {

    const grade = parseInt(gradeInput);


    if (isNaN(grade) || grade < 0 || grade > 100) {
      console.log("Invalid grade");
    } else if (grade >= 93) {
      console.log("You get an A");
    } else if (grade >= 80) {
      console.log("You get a B");
    } else if (grade >= 60) {
      console.log("You get a C");
    } else if (grade >= 50) {
      console.log("You get a D");
    } else {
      console.log("You get an F");
    }

    rl.close();
  });
});
