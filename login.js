function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};
    
    
    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    

    return objDados;
}

function login() {
    const objDados = leDados();
    let strEmail = document.getElementById ('email').value;
    let strSenha = document.getElementById ('senha').value;

    const findCadastro = objDados.cadastros.find((usuario) => usuario.email === strEmail);
    if(!findCadastro) alert('Dados não encontrados'); 
    else {
        if (findCadastro.senha !== strSenha) alert('Senha incorreta!');
        else {
            localStorage.setItem('session', JSON.stringify(findCadastro));
            window.location.assign('/home.html');
            
        }
    }
}

document.getElementById ('sign-in').addEventListener ('click', login);
