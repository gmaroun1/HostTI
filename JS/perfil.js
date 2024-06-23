document.addEventListener("DOMContentLoaded", function() {
    const toggleThemeButton = document.getElementById('toggle-theme');
    toggleThemeButton.addEventListener('click', function() {
        console.log("Botão de alternância de tema clicado");
        document.body.classList.toggle('dark-mode');
    });

    const userName = document.querySelector('.profile-name').textContent;
    alert(`Bem-vindo(a), ${userName}!`);
});
