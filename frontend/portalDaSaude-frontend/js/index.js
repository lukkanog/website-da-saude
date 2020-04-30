const iconeLogin = document.getElementById("login-logout_icon");
const textoLogin = document.querySelector("#login_text");
const linkLogin = document.querySelector("#login");
const bairro = document.querySelector("#bairro");
const cadastro = document.querySelector("#cadastro");

const main = document.querySelector("main");
const footer = document.querySelector("footer");
const nav = document.querySelector("nav");
const botaoMenu = document.querySelector("#menu_icon");

verificarUsuarioLogado();

var menuEstaAberto = true;

botaoMenu.addEventListener("click",() =>{
    if (!menuEstaAberto){
        abrirMenu();
    } else{
        fecharMenu();
    }
})

function verificarUsuarioLogado(){
    
    var token = localStorage.getItem("portalDaSaude-token");
    
    if (token === null || token === undefined){
        //se o usuario não estiver logado:
        textoLogin.textContent = "Login";
        iconeLogin.className="rotated";

    } else{
        //se o usuario estiver logado:
        // cadastro.className="escondido"
        // bairro.className="exibido";

        //fazer logout
        linkLogin.addEventListener("click",() =>{
            localStorage.removeItem("portalDaSaude-token");
            location.reload();
        })
    }
}

function fecharMenu(){
    nav.className = "hidden_nav";
    botaoMenu.className = "menu_hidden_icon";
    main.className = "full_width";
    footer.className = "full_width";
    menuEstaAberto = false;
}

function abrirMenu(){
    nav.classList.remove("hidden_nav");
    botaoMenu.classList.remove("menu_hidden_icon");
    main.classList.remove("full_width");
    footer.classList.remove("full_width");
    menuEstaAberto = true;
}
