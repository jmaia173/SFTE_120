function Even_Or_Odd(num) { 
    
     if (num % 2 === 0) {
        console.log("The number is even.");
    } else {
        console.log("The number is odd.");
    }
}

Even_Or_Odd(6);  
Even_Or_Odd(7);

const countries = ["USA", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Peru", "Colombia", "Venezuela", "Costa Rica"];
countries.sort();
console.log(countries);

function money_conversion(amount, currency) {
    switch (currency) {
        case "BRL":
            console.log(amount * 5.6);
            break;
        case "EUR":
            console.log(amount * 0.92);
            break;
        case "JPY":
            console.log(amount * 151.44);
            break;
        default:
            console.log("Currency not supported");

    }
}
money_conversion(100, "BRL");
money_conversion(100, "EUR");
money_conversion(100, "JPY");
money_conversion(100, "RUB");