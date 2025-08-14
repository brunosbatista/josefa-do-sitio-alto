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
    event.preventDefault()
    let nome = document.querySelector('#nome').value;
    let email = document.querySelector('#email').value;
    let celular = document.querySelector('#telefone').value;
    let mensagem = document.querySelector('#mensagem').value;

    conexaoApi(nome, email, celular, mensagem);
    
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