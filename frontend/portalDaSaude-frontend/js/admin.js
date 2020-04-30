
if (!usuarioEstaVerificado()){
    window.location.replace("../index.html")
}


usuarioEstaVerificado();


function usuarioEstaVerificado(){
    let token = localStorage.getItem("portalDaSaude-token");
    
    if (token !== null){

        let usuario = parseJwt(token);
        var tempoAtual = new Date().getTime() / 1000;

        // se o usuario estiver logado e sua permissao for de administrador e o tempo de sua sessão(token) não tiver expirado
        if (usuario !== null && usuario.permissao === "ADMINISTRADOR" && tempoAtual < usuario.exp){
            return true;
        } else{
            return false;
        }
    } else{
        return false;
    }

}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};