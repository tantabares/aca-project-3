console.log("Bienvenidos a Node JS!");

const fs = require("fs");
const calc = require("./calc");
fs.readFile("script.sql", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString("utf8"));
});

console.log(calc.sumar(3, 4));
