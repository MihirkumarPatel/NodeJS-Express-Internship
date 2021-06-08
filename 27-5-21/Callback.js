function greet(name, callbackFunction) {
  console.log(`
        hello ${name}...!!!
    `);
  callbackFunction();
}

function func() {
  console.log("just another function");
}

greet("Mihir", func);
