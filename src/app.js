const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Digite o CEP: ", (cep) => {
  console.log("CEP recebido:", cep);
  rl.close();
});
