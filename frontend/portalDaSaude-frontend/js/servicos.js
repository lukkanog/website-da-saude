const section = document.querySelector("#servicos_de_saude");
const loading = document.querySelector("#loading");

var servicosExibidos = [];

carregarServicos();

function carregarServicos(){
    var url = "http://localhost:5000/api/servicos";
    fetch(url)
    .then(response => response.json())
    .then(data => {
        pararDeCarregar();
        preencherConteudo(data);
    })
    .catch(error => console.log(error))
}

preencherConteudo = (servicos) =>{
    servicosExibidos = servicos;
    console.log(servicos)

    servicos.forEach(item => {
        var box = document.createElement("div");
        box.className = "box";

        var titulo = document.createElement("h3");
        titulo.textContent = item.nomeServico;        
        box.appendChild(titulo);

        var divCategoria = document.createElement("div");

        var textoCategoria = document.createElement("p");
        textoCategoria.className = "smaller";
        textoCategoria.textContent = "Categoria";
        
        var categoria = document.createElement("p");
        categoria.className = "valor";
        categoria.textContent = item.idCategoriaNavigation.nomeCategoria;
        
        var link = document.createElement("a");
        link.href = gerarUrl(item);
        link.textContent = "Ver locais de atendimento";

        
        divCategoria.appendChild(textoCategoria);
        divCategoria.appendChild(categoria);
        box.appendChild(divCategoria);
        box.appendChild(categoria);
        box.appendChild(link);

        section.appendChild(box)

    });
}

gerarUrl = (servico) =>{
    var url = "servico.html?idServico=" + servico.idServico;
    return url;
}

pararDeCarregar = () => {
    loading.remove();
}