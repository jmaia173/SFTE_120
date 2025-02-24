function sayHello() {
    let you = "Joao";
    console.log("Hello " + you + "!");
}

sayHello();

function greet(firstName, lastName){
    return `Hello ${firstName} ${lastName}!`;
}
console.log(greet("Beto", "Vargas")); 
console.log(greet("Maria", "Betana"));

function add(a, b) {
    console.log(a + b);
}

add(2, 3);

function multiply(a, b = 2) {
    return a * b;
}
console.log(multiply(2, 3));
console.log(multiply(2));

function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log(factorial(5));
console.log(factorial(3));

