const title = document.querySelector("title");
const loading = document.querySelector("#loading");
const nomeDoLocal = document.querySelector("#subtitle");
const divEndereco = document.querySelector("#endereco_group");
const divBairro = document.querySelector("#bairro_group");
const sectionPrincipal = document.querySelector("#servicos");
const divDosServicos = document.querySelector("#flex");
const contents = document.getElementsByClassName("content");
const mainContent = contents[0];

obterParametro();

function obterParametro() {
    var queryString = window.location.search;

    if (queryString !== null && queryString !== "") {
        var parametro = new URLSearchParams(queryString);
        if (parametro.has("idLocal")) {
            var id = parametro.get("idLocal");
            console.log(id);
            buscarLocal(id);
        }
    } else {
        window.location.href = "index.html"
    }
}

function buscarLocal(id) {
    var url = "http://localhost:5000/api/ServicosPrestados/local/" + id;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            pararDeCarregar();
            preencherConteudo(data);
        })
        .catch(error => console.log(error))

}

preencherConteudo = (conteudo) => {
    if (conteudo !== null && conteudo !== undefined && conteudo.servicos.length >= 1) {
        title.textContent = conteudo.local.nomeLocal;

        var h2 = document.createElement("h2");
        h2.id = "subtitle";
        h2.textContent = conteudo.local.nomeLocal;
        mainContent.insertBefore(h2, divEndereco);


        var endereco = document.createElement("p");
        endereco.className = "caracteristica";
        endereco.textContent = conteudo.local.logradouro + ", " + conteudo.local.numero;
        divEndereco.appendChild(endereco);

        var bairro = document.createElement("p");
        bairro.className = "caracteristica";
        bairro.textContent = conteudo.local.idBairroNavigation.nomeBairro;
        divBairro.appendChild(bairro);


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
            console.log("achou a situacao nao rapaiz");
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
