function isValidCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");
  return /^[0-9]{8}$/.test(cepLimpo);
}

module.exports = { isValidCep };
