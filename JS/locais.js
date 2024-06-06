// Função para adicionar novo lugar ao histórico
function addBar() {
    var form = document.getElementById("bar-form");
    var barName = form["bar-name"].value;
    var barAddress = form["bar-address"].value;
    var visitDate = form["visit-date"].value;

    // Dividindo a data em partes (ano, mês, dia)
    var parts = visitDate.split('-');
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // Subtraímos 1 do mês porque em JavaScript os meses são indexados de 0 a 11
    var day = parseInt(parts[2]);

    // Criando um objeto de data com o ano, mês e dia corretos
    var dateObject = new Date(year, month, day);

    // Formatando a data para o formato brasileiro "dd/mm/yyyy"
    var formattedDate = `${dateObject.getDate().toString().padStart(2, '0')}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getFullYear()}`;

    // Criando um novo elemento de bloco de barra
    var newBarBlock = document.createElement("div");
    newBarBlock.classList.add("bar-block");

    // Montando o HTML para o novo bloco de barra
    newBarBlock.innerHTML = `
        <p><span class="bar-name">${barName}</span></p>
        <p class="bar-address">${barAddress}</p>
        <p>Data da visita: ${formattedDate}</p>
    `;

    // Adicionando o novo bloco de barra ao histórico
    var historySection = document.querySelector(".history-section");
    historySection.insertBefore(newBarBlock, document.getElementById("add-bar-form"));
    
    // Limpar o formulário após adicionar o novo lugar
    form.reset();
}

// Adicionar um ouvinte de evento para o formulário de envio
document.getElementById("bar-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impedir o comportamento padrão do formulário
    addBar(); // Chamar a função para adicionar o novo lugar
});
