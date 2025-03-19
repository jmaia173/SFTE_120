class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    g() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}
let p1 = new Person("Joao", 19);
p1.g();

let dog = { dogName: "Rex",
    weight: 17,
    color: "black and white",
    breed: "Husky",
};

class ClassName{
    constructor(prop1, prop2){
        this.prop1 = prop1;
        this.prop2 = prop2;       
    }
}

let obj = new ClassName("value1", "value2");

function dog(dogName, weight, color, breed) {
    this.dogName = dogName;
    this.weight = weight;
    this.color = color;
    this.breed = breed;
}

let dog = new dog("Rex", 17, "black and white", "Husky"); 

class dog {
    constructor(dogName, weight, color, breed) {
        this.dogName = dogName;
        this.weight = weight;
        this.color = color;
        this.breed = breed;
    }
}

let dog = new dog("Rex", 17, "black and white", "Husky");

console.log(dog.dogName, "is a ", dog.color, dog.breed, "that weighs", dog.weight, "kg.");

class Student {
    constructor(firstName, lastName, dateOfBirth, idNumber, collegeName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.idNumber = idNumber;
        this.collegeName = collegeName;
    }

    studentInfo() {
        console.log(this.firstName, this.lastName, "was born on", this.dateOfBirth, "and is a student at", this.collegeName, "with ID number", this.idNumber);
    }
}

let student = new Student("Joao", "Maia", "11-06-2005", "22445", "Bushnell University");

student.studentInfo(); 





