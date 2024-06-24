const pages = {
    "dark-mode": {
        title: "Modo Escuro",
        content: `<p>Ative o modo escuro para uma melhor visualização à noite.</p>
                  <label class="switch">
                    <input type="checkbox" id="darkModeToggle" onchange="toggleDarkMode()">
                    <span class="slider round"></span>
                  </label>`
    },
    "account": {
        title: "Conta",
        content: `<p>Opções para mudar a sua conta.</p>`
    },
    "terms-policies": {
        title: "Termos e Políticas",
        content: `<p>Bem-vindo ao nosso serviço de divisão de contas em bares e restaurantes. Ao utilizar nosso serviço, você concorda com os seguintes termos e políticas. É importante ler e compreender estes termos antes de utilizar o nosso serviço.</p>
                  <ol>
                    <li><strong>Aceitação dos Termos</strong>
                        <p>Ao acessar ou utilizar nosso serviço, você concorda em estar vinculado a estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Se você não concordar com qualquer um destes termos, não use nosso serviço.</p>
                    </li>
                    <li><strong>Descrição do Serviço</strong>
                        <p>Nosso serviço permite que os usuários dividam de forma justa e conveniente as contas em bares e restaurantes. Fornecemos uma plataforma digital onde os usuários podem calcular a divisão das despesas, incluindo taxas e gorjetas, e realizar pagamentos de forma eficiente.</p>
                    </li>
                    <li><strong>Registro de Usuário</strong>
                        <p>Para utilizar nosso serviço, você pode ser solicitado a criar uma conta e fornecer informações pessoais como nome, e-mail e detalhes de pagamento. Você concorda em fornecer informações verdadeiras, precisas, atuais e completas durante o processo de registro e a manter essas informações atualizadas.</p>
                    </li>
                    <li><strong>Privacidade</strong>
                        <p>Nosso compromisso com a sua privacidade é descrito em nossa Política de Privacidade. Ao utilizar nosso serviço, você consente com a coleta, uso e divulgação de suas informações conforme descrito na Política de Privacidade.</p>
                    </li>
                    <li><strong>Uso Adequado do Serviço</strong>
                        <p>Você concorda em utilizar o serviço apenas para fins legais e de acordo com estes Termos de Serviço. Você não pode utilizar nosso serviço para:
                        <ul>
                            <li>Violar qualquer lei local, estadual, nacional ou internacional.</li>
                            <li>Falsificar ou deturpar sua identidade ou afiliação com qualquer pessoa ou entidade.</li>
                            <li>Interferir ou interromper o serviço ou os servidores ou redes conectadas ao serviço.</li>
                            <li>Tentar obter acesso não autorizado ao serviço ou a qualquer conta de usuário.</li>
                        </ul></p>
                    </li>
                    <li><strong>Divisão de Contas</strong>
                        <p>Nosso serviço facilita a divisão de contas, mas não assume responsabilidade pela exatidão das divisões realizadas pelos usuários. É responsabilidade dos usuários verificar e confirmar a divisão das despesas entre si.</p>
                    </li>
                    <li><strong>Pagamentos</strong>
                        <p>Os pagamentos através do nosso serviço são processados por provedores de pagamento terceirizados. Não nos responsabilizamos por erros ou problemas causados por esses provedores. Você concorda em pagar todas as taxas e encargos associados ao uso do nosso serviço.</p>
                    </li>
                    <li><strong>Cancelamento e Reembolso</strong>
                        <p>Políticas de cancelamento e reembolso variam conforme o bar ou restaurante específico. Você deve verificar essas políticas diretamente com o estabelecimento. Não oferecemos reembolsos por serviços já prestados.</p>
                    </li>
                    <li><strong>Modificações no Serviço</strong>
                        <p>Reservamo-nos o direito de modificar ou descontinuar, temporária ou permanentemente, o serviço (ou qualquer parte dele) com ou sem aviso prévio. Você concorda que não seremos responsáveis por qualquer modificação, suspensão ou descontinuação do serviço.</p>
                    </li>
                    <li><strong>Limitação de Responsabilidade</strong>
                        <p>Em nenhuma circunstância seremos responsáveis por quaisquer danos indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar o serviço, mesmo que tenhamos sido avisados da possibilidade de tais danos.</p>
                    </li>
                    <li><strong>Alterações nos Termos de Serviço</strong>
                        <p>Podemos revisar estes Termos de Serviço a qualquer momento. Notificaremos você sobre qualquer alteração significativa. Ao continuar a usar o serviço após a atualização dos termos, você concorda em estar vinculado aos termos revisados.</p>
                    </li>
                    <li><strong>Contato</strong>
                        <p>Se você tiver qualquer dúvida sobre estes Termos de Serviço, entre em contato conosco pelo e-mail <a href="mailto:slash@gmail.com">slash@gmail.com</a>.</p>
                    </li>
                  </ol>
                  <p>Obrigado por escolher nosso serviço de divisão de contas em bares e restaurantes. Apreciamos sua confiança e esperamos proporcionar uma experiência agradável e conveniente.</p>`
    
    },
    "report-problem": {
        title: "Relatar um Problema",
        content: `<p>Descreva o problema abaixo:</p>
                  <textarea id="problemDescription" rows="4" cols="50"></textarea>
                  <button onclick="sendProblem()">Enviar</button>`
    }
};

let darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';

function openPage(page) {
    const pageData = pages[page];
    const mainElement = document.getElementById('settings-options');
    mainElement.innerHTML = `
        <h1>${pageData.title}</h1>
        ${pageData.content}
        <button onclick="goBack()">Voltar</button>
    `;
    if (page === 'dark-mode') {
        document.getElementById("darkModeToggle").checked = darkModeEnabled;
    }
    applyDarkMode();
}

function toggleDarkMode() {
    darkModeEnabled = document.getElementById('darkModeToggle').checked;
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
    applyDarkMode();
}

function applyDarkMode() {
    const body = document.getElementById('body');
    if (darkModeEnabled) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

function sendProblem() {
    const problemDescription = document.getElementById('problemDescription').value;
    window.location.href = `mailto:rafarehfeld@gmail.com?subject=Relatar%20um%20Problema&body=${encodeURIComponent(problemDescription)}`;
}

function logout() {
    alert('Saindo...');
    window.location.href = 'login.html'; // Redireciona para a página de login
}

function goBack() {
    const mainElement = document.getElementById('settings-options');
    mainElement.innerHTML = `
        <button onclick="openPage('dark-mode')">Modo Escuro <span class="arrow">&#9654;</span></button>
        <button onclick="openPage('account')">Conta <span class="arrow">&#9654;</span></button>
        <button onclick="openPage('terms-policies')">Termos e Políticas <span class="arrow">&#9654;</span></button>
        <button onclick="openPage('report-problem')">Relatar um Problema <span class="arrow">&#9654;</span></button>
        <button><a href="home.html">Voltar</a></button>
    `;
    applyDarkMode();
}


document.addEventListener('DOMContentLoaded', () => {
    applyDarkMode();
});
