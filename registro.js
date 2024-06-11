

function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};
    
    
    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { cadastros: [
            {nome: "admin", email: "admin@123.com", senha: "12345"},
            {nome: "teste", email: "teste@123.com", senha: "123456"},
            {nome: "usuario", email: "usuario@email.com", senha: "1234567"} ]
        }
    }

    return objDados;
}

function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}

function incluirCadastro () {
    // Ler os dados
    let objDados = leDados();
    // Incluir novo
    let strNome = document.getElementById ('nome').value;
    let strEmail = document.getElementById ('email').value;
    let strSenha = document.getElementById ('senha').value;
    if (strEmail == "" || strSenha == "" || strNome == "") alert('Digite um valor valido');
    else {
        let novoCadastro = {
            nome: strNome,
            email: strEmail,
            senha: strSenha
        };
        const findCadastro = objDados.cadastros.find((usuario) => usuario.email === strEmail);
        if(findCadastro) {
            alert('Usuario já registrado');
        }
        else {
            objDados.cadastros.push (novoCadastro);
            // Salvar novamente
            salvaDados (objDados);
            window.location.assign('login.html')
        }
    }
}


function imprimeDados () {
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados ();
    
    for (i = 0 ; i < objDados.cadastros.length; i++) {
        strHtml+= `<p>nome: ${objDados.cadastros[i].nome} - email: ${objDados.cadastros[i].email} - senha: ${objDados.cadastros[i].senha}</p>`
    }
    
    tela.innerHTML = strHtml;
}

function escondeDados () {
    let tela = document.getElementById('tela');
    tela.innerHTML = '';
}

// Configurações dos botões

document.getElementById ('sign-up').addEventListener ('click', incluirCadastro);
/*
apenas pra debug
document.getElementById ('exibeDados').addEventListener ('click', imprimeDados);
document.getElementById ('ocultaDados').addEventListener ('click', escondeDados);
*/