const email = document.querySelector("#email");
const senha = document.querySelector("#pwd");
const form = document.querySelector("#form_login");
const box = document.querySelector("#login_box");
const loading = document.querySelector("#loading");
const token = localStorage.getItem("portalDaSaude-token")


if (token != null || token != undefined){
    window.location.href = "adm/admin.html";
}

form.addEventListener("submit",() =>{
    event.preventDefault();
    if (email.value == "" || senha.value == "" || senha.value == null || senha.value.length < 6){
        alert("Por favor, preencha os campos corretamente");

    } else{
        efetuarLogin();
    }

})


efetuarLogin = async() =>{
    começarACarregar();

    var url = "http://lukkanog-001-site1.ftempurl.com/api/login";

    const body = {
        "email" : email.value,
        "senha" : senha.value,
    }

    await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if (data.erro != undefined || data.erro === true){
            alert(data.mensagem);
            pararDeCarregar();
        } else{
            salvarToken(data.token);
        }
    })
    .catch(error =>{
        pararDeCarregar();
        alert("Ocorreu um erro inesperado. Tente novamente mais tarde");
    })
}


salvarToken = (token) => {
    localStorage.setItem("portalDaSaude-token", token);
    window.location.href = "adm/admin.html";
}

começarACarregar = () => {
    form.className = "escondido";
    loading.classList.remove("escondido");
}

pararDeCarregar = () => {
    form.classList.remove("escondido");
    loading.className = "escondido";
}