let saldo = 0;

function showDeposit() {
    document.getElementById('optionsContainer').style.display = 'block';
    document.getElementById('alternar').style.display = 'block';
}

function showInput(opcao) {
  document.getElementById('inputContainer').style.display = 'block';
}

function showCarteira() {
  document.getElementById('carteira').style.display = 'block';
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

