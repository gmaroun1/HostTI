let saldo = 0;

function showCarteira() {
  if (document.getElementById('carteira').style.display == 'block') {
    document.getElementById('carteira').style.display = 'none';
    document.getElementById('optionsContainer').style.display = 'none';
  }
  else document.getElementById('carteira').style.display = 'block';
}

function showDeposit() {
  document.getElementById('optionsContainer').style.display = 'block';
}    

function showInput(opcao) {
  if (opcao === 'debito' || opcao === 'credito' || opcao === 'pix') {
    document.getElementById('inputContainer').style.display = 'block';
    document.getElementById('optionsContainer').style.display = 'none'; // Esconder as opções de pagamento ao mostrar o input
}
}


function deposit() {
  const valor = parseFloat(document.getElementById('valor').value);
  if (isNaN(valor) || valor <= 0) {
    alert('Por favor, insira um valor válido.');
    return;
  }
  saldo += valor;
  document.getElementById('saldo').innerText = `R$ ${saldo.toFixed(2)}`;
  document.getElementById('valor').value = '';
  document.getElementById('inputContainer').style.display = 'none';
  document.getElementById('optionsContainer').style.display = 'none';
  document.getElementById('carteira').style.display = 'none';
  alert('Depósito realizado');
}

function confirm() {
  saldo = saldo - valorCompartilhado;
  console.log(saldo);
  document.getElementById('saldo').innerText = `R$ ${saldo.toFixed(2)}`;

}