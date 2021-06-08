// import file from './file1';
const file = require("./file1");

file.display("string");
console.log(file.sum(4, 5));
console.log(file.multiply(5, 10));
console.log("Strig abba is: " + file.isPalindrome("abba")? "Palindrome" : "Not Palindrome");

var a = "string is"
var b = "concatenated"
console.log(file.concateString(a, b));