async function buscarEnderecoPorCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");

  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao consultar a API ViaCEP.");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  return data;
}

module.exports = { buscarEnderecoPorCep };
