const iconeLogin = document.getElementById("login-logout_icon");
const textoLogin = document.querySelector("#login_text");
const linkLogin = document.querySelector("#login")
const bairro = document.querySelector("#bairro");
const cadastro = document.querySelector("#cadastro")

verificarUsuarioLogado();

function verificarUsuarioLogado(){
    
    var token = localStorage.getItem("portalDaSaude-token");
    
    if (token === null || token === undefined){
        //se o usuario não estiver logado:
        textoLogin.textContent = "Login"
        iconeLogin.className="rotated";

    } else{
        //se o usuario estiver logado:
        cadastro.className="escondido"
        bairro.className="exibido";

        //fazer logout
        linkLogin.addEventListener("click",() =>{
            localStorage.removeItem("portalDaSaude-token");
            location.reload();
        })
    }
}