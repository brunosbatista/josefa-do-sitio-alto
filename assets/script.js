window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { // Se a página for rolada mais de 50px
        navbar.classList.add("header-scrolled");
    } else {
        navbar.classList.remove("header-scrolled");
    }
});