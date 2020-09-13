const loading = document.querySelector("#loading");
const section = document.querySelector("#locais_de_atendimento");
const filtroBairro = document.querySelector("#bairros");
const filtroTipo = document.querySelector("#tipos");
var locaisExibidos;
var locaisIniciais = [];

var erro = false;

try {
    carregarLocais();
    carregarTipos();
    carregarBairros();
} catch (error) {
    console.log(error)
}

async function carregarLocais(){
    var url = "http://lukkanog-001-site1.ftempurl.com/api/locais";
    await fetch(url)
    .then(response => response.json())
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

preencherConteudo = (locais) => {
    if (locais.length <= 0 || locais == null){
        exibirNaoEncontrado();
    }
    
    locaisExibidos = locais;

    //se for a primeira vez chamando essa função, salvará todos os locais puxados inicialmente, para futuramente usa-los ao limpar os filtros
    if (locaisIniciais.length == 0){
        locaisIniciais = locais;
    }

    locais.forEach(item => {
        try {
            var box = document.createElement("div");
            box.className = "box";
            
            var titulo = document.createElement("h3");
            titulo.textContent = item.nomeLocal;        
            box.appendChild(titulo);
            
            var divEndereco = document.createElement("div");
            divEndereco.className = "caracteristica";
            
            var textoEndereco = document.createElement("p");
            textoEndereco.textContent = "Endereço";
            textoEndereco.className = "smaller";
            
            var endereco = document.createElement("p");
            endereco.textContent = item.logradouro + ", " + item.numero;
            endereco.className = "valor";
            divEndereco.appendChild(textoEndereco);
            divEndereco.appendChild(endereco);


            var divBairro = document.createElement("div");
            divBairro.className = "caracteristica";
            
            var textoBairro = document.createElement("p");
            textoBairro.textContent = "Bairro";
            textoBairro.className = "smaller";
            
            var bairro = document.createElement("p");
            bairro.textContent = item.idBairroNavigation.nomeBairro;
            bairro.className = "valor";
            divBairro.appendChild(textoBairro);
            divBairro.appendChild(bairro);

            var link = document.createElement("a");
            link.href = gerarUrl(item);
            link.textContent = "Ver mais";

            box.appendChild(titulo);
            box.appendChild(divEndereco);
            box.appendChild(divBairro);
            box.appendChild(link);

            section.appendChild(box);

        } catch (error) {
            console.log(error)
        }
    })
}

gerarUrl = (local) =>{
    var url = "local.html?idLocal=" + local.idLocal;
    return url;
}

pararDeCarregar = () => {
    loading.remove();
}

async function carregarBairros(){
    var url = "http://lukkanog-001-site1.ftempurl.com/api/bairros";
    await fetch(url)
    .then(response => response.json())
    .then(data => preencherBairros(data))
    .catch(error => {
        console.log(error);
        if (!erro){
            erro = true;
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            window.location.href = "index.html";
        }
    })
}


preencherBairros = (bairros) =>{
    bairros.forEach(item =>{
        var option = document.createElement("option");
        option.value = item.idBairro;
        option.label = item.nomeBairro;
        option.className = "bairro_option"

        filtroBairro.appendChild(option);
    })
}

async function carregarTipos(){
    var url = "http://lukkanog-001-site1.ftempurl.com/api/tiposlocais";
    await fetch(url)
    .then(response => response.json())
    .then(data => preencherTiposDeLocais(data))
    .catch(error => {
        console.log(error);
        if (!erro){
            erro = true;
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            window.location.href = "index.html";
        }
    })
}

preencherTiposDeLocais = (tipos) =>{
    tipos.forEach(item =>{
        var option = document.createElement("option");
        option.value = item.idTipoLocal;
        option.label = item.nomeTipolocal;
        option.className = "tipo_option"

        filtroTipo.appendChild(option);
    })
}

//#region FILTRO
$(".filtro").change(function(){
    filtrar();
})

filtrar = () =>{
    var idFiltroBairro = $("#bairros").children("option:selected").val();
    var idFiltroTipo = $("#tipos").children("option:selected").val();
    
    var novaLista = [];
    
    if (idFiltroBairro <= 0 && idFiltroTipo > 0){
        //filtra só pelo tipo
        novaLista = locaisIniciais.filter(item => item.idTipoLocal == idFiltroTipo);
    } else if (idFiltroTipo <= 0 && idFiltroBairro > 0){
        //filtra só pelo bairro
        novaLista = locaisIniciais.filter(item => item.idBairro == idFiltroBairro);
    } else if (idFiltroBairro > 0 && idFiltroTipo > 0){
        //filtra pelos dois (tipo e bairro)
        novaLista = locaisIniciais.filter(item => {return item.idBairro == idFiltroBairro && item.idTipoLocal == idFiltroTipo});
    } else{
        // se tudo der errado, ele limpa os filtros
        limparFiltros();
        novaLista = locaisIniciais;
    }

    limparExibidos();
    preencherConteudo(novaLista);
}

limparFiltros = () =>{
    $("#bairros").val(0);
    $("#tipos").val(0);
}
//#endregion


limparExibidos = () => {
    $("#locais_de_atendimento").empty();
}

exibirNaoEncontrado = () =>{
    var div = document.createElement("div");
    div.id = "nao_encontrado";

    var aviso = document.createElement("p");
    aviso.className = "aviso";
    aviso.textContent = "Resultado não encontrado";
    div.appendChild(aviso);

    // var span = document.createElement("span");
    // span.id="clear";
    // span.textContent = "Limpar Filtros";
    // div.appendChild(span);

    section.appendChild(div);
}