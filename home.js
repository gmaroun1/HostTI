let usuarioLogado = {};
function isLogged() {
    usuarioLogado = JSON.parse(localStorage.getItem('session'));
    if (!usuarioLogado) window.location.assign('/login.html');
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
    strHtmlHome+= `<h1>Logado como ${usuarioLogado.email}</h1> <h3>Olá ${usuarioLogado.nome}</h3>`
    strHtmlHome+= 
    screen.innerHTML = strHtmlHome;


}

usuario();

// Config dos botões

document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.body.classList.toggle('sidebar-open');
  });
  
document.getElementById('criar').addEventListener('click', function () {
    this.style.display = 'none';

    document.getElementById('mesa').style.display = 'block';
});

document.getElementById('mostraConta').addEventListener('click', function () {
    this.style.display = 'block';
});
