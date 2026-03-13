const readline = require("readline");
const { isValidCep } = require("./utils/cepValidator");
const { buscarEnderecoPorCep } = require("./services/viacepService");
const { calcularFrete } = require("./rules/freightRules");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Digite o CEP: ", async (cep) => {

  try {

    if (!isValidCep(cep)) {
      throw new Error("CEP inválido.");
    }

    const endereco = await buscarEnderecoPorCep(cep);
    const frete = calcularFrete(endereco);

    console.log("\nCidade:", endereco.localidade);
    console.log("Estado:", endereco.uf);

    console.log("\nResultado do frete:");
    console.log(frete.mensagem);

    if (frete.valorFrete !== null) {
      console.log("Valor:", frete.valorFrete);
    }

  } catch (erro) {

    console.log("Erro:", erro.message);

  }

  rl.close();

});
