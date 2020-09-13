const section = document.querySelector("#flex");
const loading = document.querySelector("#loading");
const title = document.querySelector("title");
const divCategoria = document.querySelector("#categoria_group");
const contents = document.getElementsByClassName("content");
const mainContent = contents[0];

carregarServico();

function carregarServico() {
    var id = obterParametro();
    buscarServico(id);
}


function obterParametro() {
    var queryString = window.location.search;

    if (queryString !== null && queryString !== "") {
        var parametro = new URLSearchParams(queryString);
        if (parametro.has("idServico")) {
            var id = parametro.get("idServico");
            console.log(id);
            return id;
        }
    } else {
        window.location.href = "servicos.html"
    }
}

async function buscarServico(id) {
    var url = "http://lukkanog-001-site1.ftempurl.com/api/servicosprestados/servico/" + id;

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
    if (conteudo !== null && conteudo !== undefined && conteudo.locais.length >= 1) {
        //title da pagina
        title.textContent = conteudo.servico.nomeServico + " - " + conteudo.servico.idCategoriaNavigation.nomeCategoria;

        // h2 (titulo principal da pagina)
        var h2 = document.createElement("h2");
        h2.id = "subtitle";
        h2.textContent = conteudo.servico.nomeServico;
        mainContent.insertBefore(h2, divCategoria);

        var textoCategoria = document.createElement("p");
        textoCategoria.className = "smaller";
        textoCategoria.textContent = "Área";

        var categoria = document.createElement("p");
        categoria.className = "caracteristica";
        categoria.textContent = conteudo.servico.idCategoriaNavigation.nomeCategoria;
        divCategoria.appendChild(textoCategoria);
        divCategoria.appendChild(categoria);

        conteudo.locais.forEach(item => {
            if (item.ativo === true) {
                var box = document.createElement("div");
                box.className = "box";

                var titulo = document.createElement("h4");
                titulo.textContent = item.idLocalNavigation.nomeLocal;

                var divEndereco = document.createElement("div");
                divEndereco.className = "box_caracteristica";

                var textoEndereco = document.createElement("p");
                textoEndereco.textContent = "Endereço";
                textoEndereco.className = "box_smaller";

                var endereco = document.createElement("p");
                endereco.textContent = item.idLocalNavigation.logradouro + ", " + item.idLocalNavigation.numero;
                endereco.className = "box_valor";
                divEndereco.appendChild(textoEndereco);
                divEndereco.appendChild(endereco);

                var divBairro = document.createElement("div");
                divBairro.className = "box_caracteristica";

                var textoBairro = document.createElement("p");
                textoBairro.textContent = "Bairro";
                textoBairro.className = "box_smaller";

                var bairro = document.createElement("p");
                bairro.textContent = item.idLocalNavigation.idBairroNavigation.nomeBairro;
                bairro.className = "box_valor";
                divBairro.appendChild(textoBairro);
                divBairro.appendChild(bairro);

                var divSituacao = document.createElement("div");
                divSituacao.className = "box_caracteristica";

                var textoSituacao = document.createElement("p");
                textoSituacao.className="box_smaller";
                textoSituacao.textContent = "Situação do atendimento";

                var situacao = document.createElement("p");
                situacao.className = "box_valor situacao " + obterClasseDeSituacao(item.idSituacaoNavigation.nomeSituacao);
                situacao.textContent = item.idSituacaoNavigation.nomeSituacao;
                divSituacao.appendChild(textoSituacao);
                divSituacao.appendChild(situacao);
                
                var link = document.createElement("a");
                link.href = gerarUrl(item);
                link.textContent = "Ver local";

                box.appendChild(titulo);
                box.appendChild(divEndereco);
                box.appendChild(divBairro);
                box.appendChild(divSituacao);
                box.appendChild(link);

                section.appendChild(box);

            }

        })

    } else {
        exibirNaoEncontrado();
    }
}


gerarUrl = (local) => {
    var url = "local.html?idLocal=" + local.idLocal;
    return url;
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
    var div = document.createElement("div");
    div.id = "nao_encontrado";

    var aviso = document.createElement("p");
    aviso.className = "aviso";
    aviso.textContent = "Resultado não encontrado";
    div.appendChild(aviso);
    section.appendChild(div);
}

pararDeCarregar = () => {
    loading.remove();
}
