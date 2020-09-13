const title = document.querySelector("title");
const loading = document.querySelector("#loading");
const nomeDoLocal = document.querySelector("#subtitle");
const divEndereco = document.querySelector("#endereco_group");
const divBairro = document.querySelector("#bairro_group");
const divCep = document.querySelector("#cep_group");
const sectionPrincipal = document.querySelector("#servicos");
const divDosServicos = document.querySelector("#flex");
const contents = document.getElementsByClassName("content");
const mainContent = contents[0];

carregarLocal();

async function carregarLocal(){   
    var id = await obterParametro();
    buscarLocal(id);
}

function obterParametro() {
    var queryString = window.location.search;

    if (queryString !== null && queryString !== "") {
        var parametro = new URLSearchParams(queryString);
        if (parametro.has("idLocal")) {
            var id = parametro.get("idLocal");
            return id;
        }
    } else {
        window.location.href = "locais.html";
    }
}

async function buscarLocal(id) {
    var url = "http://lukkanog-001-site1.ftempurl.com/api/ServicosPrestados/local/" + id;
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            pararDeCarregar();
            preencherConteudo(data);
        })
        .catch(error => {
            console.log(error);
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            window.location.href = "index.html";
        })

}

preencherConteudo = (conteudo) => {
    // console.log(conteudo);
    if (conteudo !== null && conteudo !== undefined) {
        ({local} = conteudo);

        title.textContent = local.nomeLocal;

        var h2 = document.createElement("h2");
        h2.id = "subtitle";
        h2.textContent = local.nomeLocal;
        mainContent.insertBefore(h2, sectionPrincipal);

        var divEndereco = document.createElement("div");
        divEndereco.id = "endereco_group";
        divEndereco.className = "caracteristica_group";
        
        var textoEndereco = document.createElement("p");
        textoEndereco.textContent = "Endereço";
        textoEndereco.className = "smaller";

        var valorEndereco = document.createElement("p");
        valorEndereco.className = "caracteristica";
        valorEndereco.textContent = local.logradouro + ", " + local.numero;

        divEndereco.append(textoEndereco, valorEndereco);
        mainContent.insertBefore(divEndereco, sectionPrincipal);


        var divCep = document.createElement("div");
        divCep.id = "cep_group";
        divCep.className = "caracteristica_group";
        
        var textoCep = document.createElement("p");
        textoCep.textContent = "CEP";
        textoCep.className = "smaller";

        var valorCep = document.createElement("p");
        valorCep.className = "caracteristica";
        valorCep.textContent = local.cep;

        divCep.append(textoCep, valorCep);
        mainContent.insertBefore(divCep, sectionPrincipal);


        var divBairro = document.createElement("div");
        divBairro.id = "bairro_group";
        divBairro.className = "caracteristica_group";
        
        var textoBairro = document.createElement("p");
        textoBairro.textContent = "Bairro";
        textoBairro.className = "smaller";

        var valorBairro = document.createElement("p");
        valorBairro.className = "caracteristica";
        valorBairro.textContent = local.idBairroNavigation.nomeBairro;

        divBairro.append(textoBairro, valorBairro);
        mainContent.insertBefore(divBairro, sectionPrincipal);

        if (local.telefone !== null && local.telefone !== undefined){
            var divTelefone = document.createElement("div");
            divTelefone.id = "telefone_group";
            divTelefone.className = "caracteristica_group";
            
            var textTelefone = document.createElement("p");
            textTelefone.textContent = "Telefone";
            textTelefone.className = "smaller";
    
            var valorTelefone = document.createElement("p");
            valorTelefone.className = "caracteristica";
            valorTelefone.textContent = local.telefone;
    
            divTelefone.append(textTelefone, valorTelefone);
            mainContent.insertBefore(divTelefone, sectionPrincipal);
        }


        var linkMaps = document.createElement("a");
        linkMaps.textContent = "Ver local no Google Maps";
        linkMaps.className = "link_maps";
        linkMaps.href = gerarUrlMaps(local);
        linkMaps.target = "_blank";
        mainContent.insertBefore(linkMaps, sectionPrincipal);

        conteudo.servicos.forEach(item => {
            if (item.ativo === true) {
                var div = document.createElement("div");
                div.className = "servico_box";

                var divServico = document.createElement("div");

                var titulo = document.createElement("h4");
                titulo.className = "servico_title";
                titulo.textContent = item.idServicoNavigation.nomeServico;

                var categoria = document.createElement("p");
                categoria.className = "servico_subtitle";
                categoria.textContent = item.idServicoNavigation.idCategoriaNavigation.nomeCategoria;

                divServico.appendChild(titulo);
                divServico.appendChild(categoria);
                div.appendChild(divServico);

                var divSituacao = document.createElement("div");

                var situacao = document.createElement("p");
                situacao.className = "situacao " + obterClasseDeSituacao(item.idSituacaoNavigation.nomeSituacao);
                situacao.textContent = item.idSituacaoNavigation.nomeSituacao;

                var descricao = document.createElement("p");
                descricao.className = "situacao_descricao";
                descricao.textContent = item.idSituacaoNavigation.descricao;

                divSituacao.appendChild(situacao);
                divSituacao.appendChild(descricao);

                div.appendChild(divSituacao);

                divDosServicos.appendChild(div);
            }
        });

    } else {
        exibirNaoEncontrado();
    }



}

obterClasseDeSituacao = (situacao) => {
    var classe = "";

    switch (situacao) {
        case "Normal":
            classe = "normal";
            break;
        case "Indisponível":
            classe = "indisponivel";
            break;
        case "Rápido":
            classe = "rapido";
            break;
        case "Superlotado":
            classe = "superlotado";
            break;
        case "Falta de Funcionários":
            classe = "falta";
            break;
        case "Falta de Recursos":
            classe = "falta";
            break;
        case "Demorado":
            classe = "demorado";
            break;
        default:
            break;
    }

    return classe;
}

exibirNaoEncontrado = () => {
    divEndereco.remove();
    divBairro.remove();
    sectionPrincipal.remove();

    var alerta = document.createElement("h2");
    alerta.id = "subtitle";
    alerta.textContent = "Local não encontrado!";

    var linkVoltar = document.createElement("a");
    linkVoltar.textContent = "Voltar";
    linkVoltar.href = "locais.html"

    mainContent.appendChild(alerta);
    mainContent.appendChild(linkVoltar);
}

pararDeCarregar = () => {
    loading.remove();
}


gerarUrlMaps = (local) =>{
    ({nomeLocal} = local);
    return "https://google.com.br/maps/search/" + nomeLocal;
}