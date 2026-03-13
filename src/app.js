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

    const resultadoFrete = calcularFrete(endereco);

    console.log("\nEndereço encontrado:");
    console.log(`Cidade: ${endereco.localidade}`);
    console.log(`Estado: ${endereco.uf}`);

    console.log("\nResultado do frete:");
    console.log(resultadoFrete.mensagem);

    if (resultadoFrete.valorFrete !== null) {
      console.log(`Valor do frete: R$ ${resultadoFrete.valorFrete.toFixed(2)}`);
    }

  } catch (error) {
    console.log("Erro:", error.message);
  } finally {
    rl.close();
  }
});
