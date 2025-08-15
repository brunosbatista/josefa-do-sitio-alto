window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("header-scrolled");
    } else {
        navbar.classList.remove("header-scrolled");
    }
});

// Pega o checkbox e todos os links do menu
const menuToggle = document.getElementById("check");
const menuLinks = document.querySelectorAll("nav a");

// Quando clicar em qualquer link, desmarca o checkbox
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.checked = false;
  });
});

function getDadosForms() {
   event.preventDefault();

    let campos = [
        { elemento: document.querySelector('#nome'), nome: 'Nome' },
        { elemento: document.querySelector('#email'), nome: 'Email' },
        { elemento: document.querySelector('#telefone'), nome: 'Telefone' },
        { elemento: document.querySelector('#mensagem'), nome: 'Mensagem' }
    ];

    let valido = true;

    campos.forEach(campo => {
        let erroEl = campo.elemento.nextElementSibling;
        erroEl.textContent = ''; // limpa mensagens antigas

        if (!campo.elemento.value.trim()) {
            erroEl.textContent = `O campo ${campo.nome} é obrigatório.`;
            valido = false;
        }
    });

    if (valido) {
        let nome = campos[0].elemento.value.trim();
        let email = campos[1].elemento.value.trim();
        let celular = campos[2].elemento.value.trim();
        let mensagem = campos[3].elemento.value.trim();

        conexaoApi(nome, email, celular, mensagem);

        // Limpar campos e mensagens
        campos.forEach(campo => {
            campo.elemento.value = '';
            campo.elemento.nextElementSibling.textContent = '';
        });
    }
    
}

function conexaoApi(nome, email, celular, mensagem) {
    enviarMensagem(nome, email, celular, mensagem);
}

function enviarMensagem(nome, email, celular, mensagem) {

     const numeroWhatsApp = "5579999365635";
     const texto = `Olá, meu nome é ${nome}.
        \nEmail: ${email}
        \nTelefone: ${celular}
        \nMensagem: ${mensagem}`;

     const textoCodificado = encodeURIComponent(texto);

     const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

     window.open(linkWhatsApp, "_blank");
}

function clearForms() {
    document.querySelector('#nome').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#mensagem').value = '';
}