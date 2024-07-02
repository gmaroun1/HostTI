
let usuarioLogado = {};
function isLogged() {
    usuarioLogado = JSON.parse(localStorage.getItem('session'));
    if (!usuarioLogado) window.location.assign('../modulos/login.html');
}

isLogged();

function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};
    
    
    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    

    return objDados;
}


function usuario() {
    let screen = document.getElementById('screen');
    let strHtmlHome = '';
    strHtmlHome+= `<h2>Logado como ${usuarioLogado.email}</h2> <h3>Olá ${usuarioLogado.nome}</h3>`
    strHtmlHome+= 
    screen.innerHTML = strHtmlHome;
    
    
    }
    
    usuario();


// LOCAIS

function leDadosLocal () {
    let strDados = localStorage.getItem('bares');
    let objDados = { locais:[] };

    if (strDados) objDados = JSON.parse (strDados);


    return objDados;
}

function salvaDados (dados) {
    localStorage.setItem ('bares', JSON.stringify (dados));
}


async function novaSlash() {

    let a = document.getElementById('CEP').value;
    let b = document.getElementById('numero').value;
    let c = document.getElementById('nome').value;
    if (a == "" || a.length !== 8 || b == "" || c == "") {
        alert('Digite um valor valido!');
        }
    
    else {
        await fetch(`https://viacep.com.br/ws/${a}/json/`)
        .then(res => {
            return res.json()
        }).then((data) => {
            if (data.erro) {
                alert('erro');
            }
            else {
                local = {
                    nome: c,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    numero: b
                }
            }

        })



        dadosCEP.innerHTML = `
        <ul>
            <p>${local.nome}<p>
            <p>${local.rua} Nº ${local.numero}</p>
            <p>${local.bairro}</p>
            <p>${local.cidade}</p>
            </ul>
            <button id="submit" onclick="enviarEndereco()">Criar Mesa</button>
            `

        //console.log(local);
        //console.log(objDados);
        
        
        

        
    }    
}
    
async function enviarEndereco() {
    let objDados = leDadosLocal();

    let a = document.getElementById('CEP').value;
    let b = document.getElementById('numero').value;
    let c = document.getElementById('nome').value;

    fetch(`https://viacep.com.br/ws/${a}/json/`)
        .then(res => {
            return res.json()
        }).then((data) => {
            if (data.erro) {
                alert('erro');
            }
            else {
                local = {
                    nome: c,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    numero: b
                }
            }

        })

        if (!Array.isArray(objDados.locais)) {
            objDados.locais = [];
        }


        objDados.locais.push (local);

        console.log(local);

        
        salvaDados(objDados);
    let name = document.getElementById('nomeDoLugar');

    name.innerHTML = `
        <h1>${c}</h1>
    `;

    document.getElementById('dados').style.display = 'none';
    document.getElementById('mesa').style.display = 'block';
}

// DIVISAO

function addPerson() {
    document.getElementById('person-form').innerHTML = `
    <input type="text" id="person-name" placeholder="Nome da Pessoa">
    <button id="confirm-person-btn" onclick="confirmPessoa()">Adicionar</button>`;

}


function confirmPessoa() {
    let nome = document.getElementById('person-name').value;
    users.push({id: users.length, name: nome, pricePaid: 0, img: "../images/fotoDeUsuario.jpg", products: []});
    document.getElementById('person-form').innerHTML = ``;
    renderUsers();
}

var usuario = JSON.parse(localStorage.getItem('session'));
const users = [
    { id: 0, name: usuario.nome, pricePaid: 0, img: "../images/fotoDeUsuario.jpg", products: [] }
];

function renderUsers() {
    const usersContainer = document.getElementById("users-container");
    usersContainer.innerHTML = "";
    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.className = "user";
        userDiv.innerHTML = `
        <img src="${user.img}" alt="${user.name}">
        <div class="user-info">
        <span>${user.name}</span>
        <span>Preço Pago: R$ <span class="price-paid">${user.pricePaid.toFixed(2)}</span></span>
        </div>
        `;
        usersContainer.appendChild(userDiv);
    });
}

function renderProductHistory() {
    const productHistory = document.getElementById("product-history");
    productHistory.innerHTML = "<ul></ul>";
    users.forEach(user => {
        user.products.forEach((product, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${product.name} - R$ ${product.price.toFixed(2)} <button class="remove-product-btn" onclick="removeProduct(${user.id}, ${index})">Remover</button>`;
            productHistory.querySelector("ul").appendChild(li);
        });
    });
}

function removeProduct(userId, productIndex) {
    users.forEach(user => {
        if (user.id === userId) {
            const removedProduct = user.products.splice(productIndex, 1)[0];
            // Reduzir o valor pago pelo usuário
            user.pricePaid -= removedProduct.price;  
        }
    });

    renderUsers(); // Atualizar a exibição dos usuários na interface
    renderProductHistory(); // Atualizar a lista de produtos na interface

}

document.addEventListener("DOMContentLoaded", function () {

    let escuro = localStorage.getItem('darkModeEnabled') === 'true';
    let aside = document.getElementById('sidebar');
  
    if (escuro) {
      document.body.classList.add('dark-mode');
      aside.classList.add('dark-mode');
    }
    

    const serviceFeePercentage = 0.1; // 10%
    const appFeePercentage = 0.01; // 1%
    
    
    function renderUserSelection() {
        const userSelection = document.getElementById("user-selection");
        userSelection.innerHTML = "";
        users.forEach(user => {
            const label = document.createElement("label");
            label.innerHTML = `
            <input type="checkbox" value="${user.id}">
                ${user.name}
            `;
            userSelection.appendChild(label);
        });
    }

    
    
    
        


    document.getElementById("add-product-btn").addEventListener("click", function () {
        document.getElementById("product-form").classList.toggle("hidden");
        renderUserSelection();
    });
    
    document.getElementById("confirm-product-btn").addEventListener("click", function () {
        const productName = document.getElementById("product-name").value;
        const productPrice = parseFloat(document.getElementById("product-price").value);
        const selectedUsers = Array.from(document.querySelectorAll("#user-selection input:checked")).map(checkbox => parseInt(checkbox.value));
        const pricePerUser = productPrice / selectedUsers.length;
        
        selectedUsers.forEach(userId => {
            const user = users.find(u => u.id === userId);
            user.pricePaid += pricePerUser;
            user.products.push({ name: productName, price: pricePerUser });
        });

        renderUsers();
        renderProductHistory();
        document.getElementById("product-form").classList.add("hidden");
    });

    function setValorCompartilhado(valor) {
        window.valorCompartilhado = valor;
    }

    document.getElementById("close-bill-btn").addEventListener("click", function () {
        const totalPrice = users.reduce((sum, user) => sum + user.pricePaid, 0);
        const serviceFee = totalPrice * serviceFeePercentage;
        const appFee = totalPrice * appFeePercentage;
        const totalWithFees = totalPrice + serviceFee + appFee;
        setValorCompartilhado(totalWithFees);
        const billSummary = document.getElementById("bill-summary");
        billSummary.innerHTML = `
        <p>Total: R$ ${totalPrice.toFixed(2)}</p>
        <p>Taxa de Serviço (${(serviceFeePercentage * 100).toFixed(2)}%): R$ ${serviceFee.toFixed(2)}</p>
        <p>Taxa do App (${(appFeePercentage * 100).toFixed(2)}%): R$ ${appFee.toFixed(2)}</p>
        <p>Total a Pagar: R$ ${totalWithFees.toFixed(2)}</p>
        `;
        billSummary.classList.remove("hidden");
    });
    
    renderUsers();
});



// Config dos botões

document.getElementById('confirm').style.display = 'none';

document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.body.classList.toggle('sidebar-open');
  });
  
document.getElementById('criar').addEventListener('click', function () {
    this.style.display = 'none';

    document.getElementById('dados').style.display = 'block';
});

document.getElementById('close-bill-btn').addEventListener('click', function() {
    document.getElementById('confirm').style.display = 'block';
    document.getElementById('feedback').style.display = 'block';
});



