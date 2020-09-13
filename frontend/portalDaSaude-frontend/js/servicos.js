const section = document.querySelector("#servicos_de_saude");
const loading = document.querySelector("#loading");
const filtroCategoria = document.querySelector("#categorias");

var servicosIniciais = [];
var servicosExibidos = [];

var erro = false;

carregarServicos();
carregarCategorias();

async function carregarServicos(){
    var url = "http://lukkanog-001-site1.ftempurl.com/api/servicos";
    await fetch(url)
    .then(response =>response.json())
    .then(data => {
        pararDeCarregar();
        preencherConteudo(data);
    })
    .catch(error => {
        console.log(error);
        if (!erro){
            erro = true;
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            window.location.href = "index.html";
        }
    })
}

preencherConteudo = (servicos) =>{
    if (servicos.length <= 0){
        exibirNaoEncontrado();
    }
    
    servicosExibidos = servicos;

    if (servicosIniciais.length == 0){
        servicosIniciais = servicos;
    }

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
        box.appendChild(link);

        section.appendChild(box)
    });
}

async function carregarCategorias(){
    var url = "http://lukkanog-001-site1.ftempurl.com/api/categorias";

    await fetch(url)
    .then(response => response.json())
    .then(data => {
        pararDeCarregar();
        preencherCategorias(data);
    })
    .catch(error => {
        console.log(error);
        if (!erro){
            erro = true;
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            window.location.href = "index.html";
        }
    })
}

preencherCategorias = (categorias) =>{
    console.table(categorias)
    categorias.forEach(item =>{
        ({idCategoria, nomeCategoria} = item);

        var option = document.createElement("option");
        option.value = idCategoria;
        option.label = nomeCategoria;

        filtroCategoria.appendChild(option);
    })
}


// FILTRO
$("#categorias").change(function(){
    var idFiltroTipo = $(this).children("option:selected").val();
    var novaLista = [];

    if (idFiltroTipo > 0){
        novaLista = servicosIniciais.filter(item => item.idCategoria == idFiltroTipo); 
    } else{
        novaLista = servicosIniciais;
    }

    limparExibidos();
    preencherConteudo(novaLista);
})


gerarUrl = (servico) =>{
    var url = "servico.html?idServico=" + servico.idServico;
    return url;
}

pararDeCarregar = () => {
    loading.remove();
}

limparExibidos = () => {
    $("#servicos_de_saude").empty();
}

exibirNaoEncontrado = () =>{
    var div = document.createElement("div");
    div.id = "nao_encontrado";

    var aviso = document.createElement("p");
    aviso.className = "aviso";
    aviso.textContent = "Resultado não encontrado";
    div.appendChild(aviso);
    section.appendChild(div);
}
