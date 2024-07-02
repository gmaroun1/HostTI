
function carregaLocais() {
    let bares = JSON.parse(localStorage.getItem('bares'));

    let locaisContainer = document.getElementById('bares');

    //console.log(locais);

    if (Array.isArray(bares.locais)) {
        // Iterar sobre o vetor locais
        bares.locais.forEach(local => {
            // Criar um elemento div para cada local
            let localDiv = document.createElement('div');
            localDiv.classList.add('local-block'); // Adicionar uma classe para estilização CSS

            // Montar o HTML interno do bloco do local
            localDiv.innerHTML = `
                <h3>${local.nome}</h3>
                <p>${local.rua} Nº ${local.numero}</p>
                <p>Bairro: ${local.bairro}</p>
                <p>Cidade: ${local.cidade}</p>
            `;

            // Adicionar o bloco do local ao contêiner
            locaisContainer.appendChild(localDiv);
        });
    } else {
        // Se locais não existir ou não for um array, exibir uma mensagem ou tratar conforme necessário
        locaisContainer.innerHTML = '<p>Nenhum local encontrado.</p>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    carregaLocais();
});

 let escuro = localStorage.getItem('darkModeEnabled') === 'true';
    let aside = document.getElementById('sidebar');
  
    if (escuro) {
      document.body.classList.add('dark-mode');
      aside.classList.add('dark-mode');
    }