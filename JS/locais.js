// Função para adicionar novo lugar ao histórico
function addBar() {
    var form = document.getElementById("bar-form");
    var barName = form["bar-name"].value;
    var barAddress = form["bar-address"].value;



    // Criando um novo elemento de bloco de barra
    var newBarBlock = document.createElement("div");
    newBarBlock.classList.add("bar-block");

    // Montando o HTML para o novo bloco de barra
    newBarBlock.innerHTML = `
        <p><span class="bar-name">${barName}</span></p>
        <p class="bar-address">${barAddress}</p>
        <p>Data da visita: ${formattedDate}</p>
    `;


}

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