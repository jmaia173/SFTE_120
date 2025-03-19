// 1. Escaping Quotes
let escapedString = 'He said, "Hello, how are you?"';
console.log("Escaped String:", escapedString);

// 2. Word Counter
function wordCounter(text) {
    let words = text.split(' '); // Split the string by spaces
    return words.length;
}

let textToCount = "This is a simple sentence.";
let wordCount = wordCounter(textToCount);
console.log("Word Count:", wordCount);

// 3. Trim Whitespace
let textWithSpaces = "   This is a string with leading and trailing spaces.   ";
let trimmedText = textWithSpaces.trim(); // Removes leading/trailing spaces
console.log("Trimmed Text:", `'${trimmedText}'`);

// 4. Splitting a String into an Array
let splitString = "apple,banana,orange,grape";
let splitArray = splitString.split(","); // Split based on commas
console.log("Split Array:", splitArray);

// 5. Detecting a Substring
function containsSubstring(text, substring) {
    if (text.includes(substring)) {
        return `Substring '${substring}' found!`;
    } else {
        return `Substring '${substring}' not found.`;
    }
}

let searchText = "The quick brown fox";
let searchResult = containsSubstring(searchText, "quick");
console.log(searchResult);

// 6. Substrings with Slice
let slicedText = "Hello, World!";
let substring = slicedText.slice(7, 12); // Extract substring from index 7 to 11
console.log("Substring using slice:", substring);

// 7. Find and Replace Functions
let originalText = "The quick brown fox jumped over the lazy dog.";
let findResult = originalText.indexOf("fox");  // Find the first occurrence of "fox"
if (findResult !== -1) {
    console.log(`'fox' found at index: ${findResult}`);
} else {
    console.log("'fox' not found.");
}

let replacedText = originalText.replace("fox", "cat");  // Replace "fox" with "cat"
console.log("Replaced Text:", replacedText);