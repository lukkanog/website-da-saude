const title = document.querySelector("title");

obterParametro();

function obterParametro(){
    var queryString = window.location.search;
    
    if (queryString !== null && queryString !== ""){
        var parametro = new URLSearchParams(queryString);
        if (parametro.has("idLocal")){
            var id = parametro.get("idLocal");
            console.log(id);
            buscarLocal(id);
        }
    } else {
        window.location.href = "index.html"
    }
}

function buscarLocal(id){
    var url = "http:localhost:5000/api/ServicosPrestados/local/" + id;
    fetch(url)
    .then(response => response.json())
    .then(data => preencherConteudo(data))
    .catch(error => console.log(error))

}

preencherConteudo = (conteudo) =>{
    if (conteudo !== null){
        title.textContent = conteudo.local.nomeLocal
    }



    if (conteudo.servicos.length >= 1){
        
        conteudo.servicos.forEach(item => {
            
        });
    }
}