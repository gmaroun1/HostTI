// Função para adicionar novo produto ao histórico
function addProduct() {
    var form = document.getElementById("product-form");
    var productName = form["product-name"].value;
    var productPrice = parseFloat(form["product-price"].value).toFixed(2);
    var productQuantity = parseInt(form["product-quantity"].value);
    var productDate = form["product-date"].value;

    // Convertendo a data para o formato Date
    var dateObject = new Date(productDate);

    // Adicionando 1 dia à data para corrigir o decremento
    dateObject.setDate(dateObject.getDate() + 1);

    // Formatando a data para o formato brasileiro "dd/mm/yyyy"
    var formattedDate = dateObject.toLocaleDateString('pt-BR');

    // Calculando o total do produto
    var productTotal = (productPrice * productQuantity).toFixed(2);

    // Criando uma nova linha para o produto
    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${productPrice}</td>
        <td>${productQuantity}</td>
        <td>${productTotal}</td>
    `;

    // Verificando se já existe um bloco para esta data
    var existingSection = document.querySelector(`.history-section[data-date="${formattedDate}"]`);

    if (existingSection) {
        // Adicionando a nova linha ao bloco existente
        var tableBody = existingSection.querySelector("table tbody");
        tableBody.appendChild(newRow);
    } else {
        // Criando um novo bloco para esta data
        var newSection = document.createElement("div");
        newSection.classList.add("history-section");
        newSection.setAttribute("data-date", formattedDate);
        newSection.innerHTML = `
            <h2>${formattedDate}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Preço (R$)</th>
                        <th>Quantidade</th>
                        <th>Total (R$)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${productName}</td>
                        <td>${productPrice}</td>
                        <td>${productQuantity}</td>
                        <td>${productTotal}</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        // Adicionando o novo bloco ao documento
        var container = document.querySelector(".form-container");
        container.parentNode.insertBefore(newSection, container.nextSibling);
    }

    // Limpar o formulário após adicionar o novo produto
    form.reset();
}

// Adicionar um ouvinte de evento para o formulário de envio
document.getElementById("product-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impedir o comportamento padrão do formulário
    addProduct(); // Chamar a função para adicionar o novo produto
});
