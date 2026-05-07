// ─── Firebase ───────────────────────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAsRBsLcPbEd5Tdh8tPrbV7ShaF5Br40SQ",
    authDomain: "josefa-do-sitio-alto.firebaseapp.com",
    projectId: "josefa-do-sitio-alto",
    storageBucket: "josefa-do-sitio-alto.firebasestorage.app",
    messagingSenderId: "2568808307",
    appId: "1:2568808307:web:f5a03b3f76dfb66fffc706",
    measurementId: "G-Q1T7CLSH9C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Navbar scroll ──────────────────────────────────────────────────────────
window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("header-scrolled");
    } else {
        navbar.classList.remove("header-scrolled");
    }
});

// Fecha menu mobile ao clicar em link
const menuToggle = document.getElementById("check");
const menuLinks = document.querySelectorAll("nav a");
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.checked = false;
    });
});

// ─── Formulário ─────────────────────────────────────────────────────────────
async function getDadosForms() {
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
        erroEl.textContent = '';
        if (!campo.elemento.value.trim()) {
            erroEl.textContent = `O campo ${campo.nome} é obrigatório.`;
            valido = false;
        }
    });

    if (!valido) return;

    const nome = campos[0].elemento.value.trim();
    const email = campos[1].elemento.value.trim();
    const celular = campos[2].elemento.value.trim();
    const mensagem = campos[3].elemento.value.trim();

    const botao = document.getElementById('whatsapp-button');
    botao.disabled = true;
    botao.value = 'Enviando...';

    // 1. Salvar no Firestore
    try {
        await addDoc(collection(db, "agendamentos"), {
            nome,
            email,
            telefone: celular,
            mensagem,
            criadoEm: serverTimestamp()
        });
    } catch (erro) {  }

    // 2. Abrir WhatsApp
    enviarMensagem(nome, email, celular, mensagem);

    // 3. Limpar formulário
    campos.forEach(campo => {
        campo.elemento.value = '';
        campo.elemento.nextElementSibling.textContent = '';
    });

    botao.disabled = false;
    botao.value = 'Enviar para WhatsApp';
}

function enviarMensagem(nome, email, celular, mensagem) {
    const numeroWhatsApp = "5579999365635";
    const texto = `Olá, meu nome é ${nome}.\n\nEmail: ${email}\nTelefone: ${celular}\nMensagem: ${mensagem}`;
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

// Expõe para o onclick inline do HTML
window.getDadosForms = getDadosForms;
window.clearForms = clearForms;
