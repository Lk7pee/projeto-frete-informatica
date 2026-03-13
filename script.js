function isValidCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");
  return /^[0-9]{8}$/.test(cepLimpo);
}

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

function calcularFrete(endereco) {
  const estado = endereco.uf;
  const cidade = endereco.localidade;

  if (estado !== "PE") {
    return {
      entregaDisponivel: false,
      valorFrete: null,
      mensagem: "Não realizamos entregas para este estado."
    };
  }

  if (cidade.toLowerCase() === "jaboatão dos guararapes") {
    return {
      entregaDisponivel: true,
      valorFrete: 0,
      mensagem: "Frete grátis para Jaboatão dos Guararapes."
    };
  }

  return {
    entregaDisponivel: true,
    valorFrete: 10,
    mensagem: "Frete fixo de R$ 10,00 para Pernambuco."
  };
}

const buscarBtn = document.getElementById("buscarBtn");
const cepInput = document.getElementById("cep");
const resultado = document.getElementById("resultado");
const erro = document.getElementById("erro");

const logradouroSpan = document.getElementById("logradouro");
const bairroSpan = document.getElementById("bairro");
const cidadeSpan = document.getElementById("cidade");
const estadoSpan = document.getElementById("estado");
const mensagemSpan = document.getElementById("mensagem");
const freteSpan = document.getElementById("frete");

buscarBtn.addEventListener("click", async () => {
  const cep = cepInput.value;

  erro.textContent = "";
  resultado.classList.add("oculto");

  try {
    if (!isValidCep(cep)) {
      throw new Error("CEP inválido. Digite 8 números.");
    }

    const endereco = await buscarEnderecoPorCep(cep);
    const frete = calcularFrete(endereco);

    logradouroSpan.textContent = endereco.logradouro || "Não informado";
    bairroSpan.textContent = endereco.bairro || "Não informado";
    cidadeSpan.textContent = endereco.localidade || "Não informado";
    estadoSpan.textContent = endereco.uf || "Não informado";
    mensagemSpan.textContent = frete.mensagem;
    freteSpan.textContent = frete.valorFrete !== null
      ? `R$ ${frete.valorFrete.toFixed(2)}`
      : "Indisponível";

    resultado.classList.remove("oculto");
  } catch (e) {
    erro.textContent = e.message;
  }
});
