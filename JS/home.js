/*
const cep = document.querySelector('#CEP');
const rua = document.querySelector('#rua');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
*/


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

function leDados () {
    let strDados = localStorage.getItem('locais');
    let objDados = {};
    
    
    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { locais: []
        }
    }

    return objDados;
}

function salvaDados (dados) {
    localStorage.setItem ('locais', JSON.stringify (dados));
}
/*
cep.addEventListener('focusout', () => {
    
    try {
        const onlyNumbers = /^[0-9]+$/;
        const cepValid = /^[0-9]{8}$/;
    
        if(onlyNumbers.test(cep.val) || !cepValid.test(cep.value)) {
            throw {cep_error:'cel unvalid'};
        }

    } catch (error) {
        if
    }
    


})*/

async function novaSlash() {
    //let objDados = leDados();

    let a = document.getElementById('CEP').value;
    let novaSlash = {};
    if (a == "" || a.length !== 8) {
        alert('Digite um valor valido!');
        }
    
    else {
        await fetch(`https://viacep.com.br/ws/${a}/json/`)
        .then(res => {
            return res.json()
        }).then((data) => {
            console.log('oi');
            if (data.erro) {
                alert('erro');
            }
            else {
                novaSlash = {
                    rua: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade
                }
            }

        })

        console.log(novaSlash);

        dadosCEP.innerHTML = `
        <span>Rua: ${novaSlash.rua}</span>
        <span>Bairro: ${novaSlash.bairro}</span>
        <span>Rua: ${novaSlash.cidade}</span>
        <button id="submit" onclick="enviarEndereco()">Enviar</button>
        `

        /*
        if (novaSlash != {}) {
            objDados.locais.push (novaSlash);
            salvaDados(objDados);
        }*/

        
    }    
}
    
function enviarEndereco() {
    console.log('oi');
    document.getElementById('dados').style.display = 'none';
    document.getElementById('mesa').style.display = 'block';
}

// DIVISAO

document.addEventListener("DOMContentLoaded", function () {
    var local = localStorage.getItem('locais')
    
    const users = [
        { id: 1, name: "User 1", pricePaid: 0, img: "../images/fotoDeUsuario.jpg", products: [] },
        { id: 2, name: "User 2", pricePaid: 0, img: "../images/fotoDeUsuario.jpg", products: [] },
        { id: 3, name: "User 3", pricePaid: 0, img: "../images/fotoDeUsuario.jpg", products: [] }
    ];

    const serviceFeePercentage = 0.1; // 10%
    const appFeePercentage = 0.01; // 1%
    
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
    
    function renderProductHistory() {
        const productHistory = document.getElementById("product-history");
        productHistory.innerHTML = "<ul></ul>";
        users.forEach(user => {
            user.products.forEach(product => {
                const li = document.createElement("li");
                li.textContent = `${product.name} - R$ ${product.price.toFixed(2)}`;
                productHistory.querySelector("ul").appendChild(li);
            });
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

    document.getElementById("close-bill-btn").addEventListener("click", function () {
        const totalPrice = users.reduce((sum, user) => sum + user.pricePaid, 0);
        const serviceFee = totalPrice * serviceFeePercentage;
        const appFee = totalPrice * appFeePercentage;
        const totalWithFees = totalPrice + serviceFee + appFee;
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

document.addEventListener('DOMContentLoaded', function() {
    let escuro = localStorage.getItem('darkModeEnabled') === 'true';
  
    if (escuro) {
      document.body.classList.add('dark-mode'); 
      document.header.classList.add('dark-mode'); 
    }
  });



// Config dos botões

document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.body.classList.toggle('sidebar-open');
  });
  
document.getElementById('criar').addEventListener('click', function () {
    this.style.display = 'none';

    document.getElementById('dados').style.display = 'block';
});



document.getElementById('close-bill-btn').addEventListener('click', function() {
    document.getElementById('feedback').style.display = 'block';
});
