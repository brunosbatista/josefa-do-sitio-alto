window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { // Se a página for rolada mais de 50px
        navbar.classList.add("header-scrolled");
    } else {
        navbar.classList.remove("header-scrolled");
    }
});

const mensagemWhasApp = {
    nome: null,
    email: null,
    celular: null,
    mensagem: null

}

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

     const numeroWhatsApp = "5579999385306";
     const texto = `Olá, meu nome é ${nome}.
        \nEmail: ${email}
        \nTelefone: ${celular}
        \nMensagem: ${mensagem}`;

     const textoCodificado = encodeURIComponent(texto);

     const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

     window.open(linkWhatsApp, "_blank");
}