function lengthAndReverse(str) {
    const lengthStr = str.length;
    const reversedStr = str.split('').reverse().join('');
    console.log(lengthStr);  
    console.log(reversedStr); 
}

lengthAndReverse("Grapes");
lengthAndReverse("Yakisoba");
lengthAndReverse("Hakuna Matata");

function currency_conversion(amount, currency) {
    switch (currency) {
        case "BRL":           
            console.log("USD to BRL: " + amount * 4.95);
            break;
        case "EUR":
            console.log("USD to EUR: " + amount * 0.93);
            break;
        case "CRC":
            console.log("USD to CRC: " + amount * 533.62);
            break;
        case "INR":
            console.log("USD to INR: " + amount * 83);
            break;
        default:
            console.log("Currency not supported");

    }
}
currency_conversion(100, "BRL");
currency_conversion(100, "EUR");
currency_conversion(100, "CRC");
currency_conversion(100, "INR");