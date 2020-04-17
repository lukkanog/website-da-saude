const loading = document.querySelector("#loading");
const section = document.querySelector("#locais_de_atendimento");
const filtroBairro = document.querySelector("#bairros");
const filtroTipo = document.querySelector("#tipos");
var locaisExibidos;
var locaisIniciais = [];


try {
    carregarLocais();
    carregarBairros();
} catch (error) {
    console.log(error)
}

//   FIX ME - arruma os filtro
function carregarLocais(){
    var url = "http://localhost:5000/api/locais";
    fetch(url)
    .then(response => response.json())
    .then(data => {
        pararDeCarregar();
        preencherConteudo(data);
    })
    .catch(error => console.log(error))
}

function preencherConteudo(locais){
    if (locais.length <= 0){
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

//FILTRO POR BAIRRO
$("#bairros").change(function(){
    var opcaoSelecionada = $(this).children("option:selected").val();

    //SE A OPÇÃO SELECIONADA NAO FOR "TODOS", FILTRAR PELA OPCAO SELECIONADA
    if (opcaoSelecionada != 0){
        var filtro = locaisExibidos.filter(item => item.idBairro == opcaoSelecionada);
        limparExibidos();
        preencherConteudo(filtro);
    } else{
        limparExibidos();
        preencherConteudo(locaisIniciais);
    }
})

$("#clear").click(() =>{
    limparFiltros();
    preencherConteudo(locaisIniciais);

})

function carregarBairros(){
    var url = "http://localhost:5000/api/bairros";
    fetch(url)
    .then(response => response.json())
    .then(data => preencherBairros(data))
    .catch(error => console.log(error))
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

limparFiltros = () =>{
    $("#bairros").val(0);

}

// function carregarTipos(){
//     var url = "http://localhost:5000/api/tiposlocais";
//     fetch(url)
//     .then(response => response.json())
//     .then(data => preencherTiposDeLocais(data))
//     .catch(error => console.log(error))
// }

// preencherTiposDeLocais = (tipos) =>{
//     console.log(tipos)
//     tipos.forEach(item =>{
//         var option = document.createElement("option");
//         option.value = item.idTipoLocal;
//         option.label = item.nomeTipolocal;
//         option.className = "tipo_option"

//         filtroTipo.appendChild(option);
//     })
// }

// $("#tipos").change(function(){
//     var opcaoSelecionada = $(this).children("option:selected").val();

//     if (opcaoSelecionada != 0){
//         $("#bairros").val(0);
//         var filtro = locaisExibidos.filter(item => item.idTipoLocal == opcaoSelecionada);

//         limparExibidos();
//         preencherConteudo(filtro);
//     } else{
//         preencherConteudo(locaisIniciais);
//     }
// })
