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

module.exports = { calcularFrete };
