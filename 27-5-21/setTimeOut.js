function greet(name, callbackFunction) {
  console.log(`
    hello ${name}...!!!
  `);
  callbackFunction();
}
function func() {
  console.log("just another function");
}
setTimeout(func, 2000);
greet("Mihir", func);
