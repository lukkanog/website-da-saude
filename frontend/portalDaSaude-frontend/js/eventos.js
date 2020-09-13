const section = document.querySelector("#eventos");
const loading = document.querySelector("#loading");
var eventosExibidos = [];


carregarEventos()



async function carregarEventos() {
    const url = "http://lukkanog-001-site1.ftempurl.com/api/locaiseventos";

    await fetch(url)
        .then(response => response.json())
        .then(data => {
            pararDeCarregar();
            formatarLista(data);
            preencherConteudo();
        })
        .catch(error => {
            console.log(error);
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            window.location.href = "index.html";
        })
}


/// formata a lista de eventos exibidos. Sendo assim, é gerado um array, onde cada item é um evento que contém uma array dos locais onde acontecem.
formatarLista = (eventos) => {
    if (eventos == null || eventos.length <= 0) {
        exibirNaoEncontrado();
    } else {
        eventos.forEach(item => {
            ({idEventoNavigation : evento, idLocalNavigation : local} = item);

            if (eventosExibidos.some(element => element.idEvento == evento.idEvento)){

                var eventoExistente = eventosExibidos.find(item => item.idEvento == evento.idEvento);
                eventoExistente.locais = eventoExistente.locais.concat(local);

            } else {
                evento.locais = [];
                eventosExibidos.push(evento);
                evento.locais.push(local);
            }

        })
    }
}


preencherConteudo = () =>{    
    eventosExibidos.forEach(item => {
        ({idEvento, nomeEvento, descricao, dataInicio, dataTermino, locais} = item);

        //#region BOTAO ABRIR/FECHAR EVENTO
        var box = document.createElement("div");
        box.className = "dropdown";

        var botao = document.createElement("div");
        botao.className = "btn_dropdown";
        botao.setAttribute("role","button");
        botao.setAttribute("aria-label","expandir evento para mais informações");
        botao.setAttribute("aria-haspopup","true");        
        botao.setAttribute("aria-expanded","false");  
        
        var textos = document.createElement("div");
        var titulo = document.createElement("h3");
        titulo.textContent = nomeEvento;

        var data = document.createElement("p");
        data.textContent = formatarData(item);
        textos.append(titulo, data);
        botao.appendChild(textos);

        var seta = document.createElement("div");
        seta.className = "ver_mais";

        var iconeSeta = document.createElement("img");
        iconeSeta.src = "../assets/img/arrow-icon.png.png";
        iconeSeta.alt = "";
        seta.appendChild(iconeSeta);
        botao.appendChild(seta);
        box.appendChild(botao); 


        $(botao).click(function(){

            // mostra/ esconde a lista de locais e a descricao
            $(this).parent().children("ul").slideToggle();
            $(this).parent().children(".event_description").slideToggle();
        
            //vira a setinha pra cima/pra baixo
            $(this).children(".ver_mais").children("img").toggleClass("turned");
        })
        //#endregion

        //#region DESCRICAo
        var textoDescricao = document.createElement("p");
        textoDescricao.textContent = descricao;
        textoDescricao.className = "event_description";
        box.appendChild(textoDescricao);
        //#endregion

        //#region lista de eventos
        var lista = document.createElement("ul");
        lista.className = "dropdown-menu";

        var header = document.createElement("li");
        header.className = "dropdown-header";
        header.textContent = "Locais";
        lista.appendChild(header);

        locais.forEach(item =>{
            ({nomeLocal} = item);

            var li = document.createElement("li");
            li.className = "dropdown-item";

            var link = document.createElement("a");
            link.href = gerarUrl(item);
            link.textContent = nomeLocal;

            li.appendChild(link);
            lista.appendChild(li);
        })

        box.appendChild(lista);
        //#endregion

        
        section.appendChild(box);

        

    })
}

formatarData = (evento) =>{
    ({dataInicio, dataTermino} = evento);

    var diaInicio = dataInicio.split("T")[0];
    var diaTermino = dataTermino.split("T")[0];

    if (diaInicio == diaTermino){
        var ano = diaInicio.split("-")[0];
        var mes = diaInicio.split("-")[1];
        var dia = diaInicio.split("-")[2];

        var stringData = dia + "/" + mes + "/" + ano;

        var horario = dataInicio.split("T")[1];
        if (horario !== "00:00:00"){
            var hora = horario.split(":")[0];
            var minutos = horario.split(":")[1];

            var stringHora = hora + ":" + minutos;
            return stringData + " às " + stringHora;
        } else{
            return stringData;
        }

    } else {
        var anoInicial = diaInicio.split("-")[0];
        var mesInicial = diaInicio.split("-")[1];
        var diaInicial = diaInicio.split("-")[2]; 

        var anoFim = diaInicio.split("-")[0];
        var mesFim = diaTermino.split("-")[1];
        var diaFim = diaTermino.split("-")[2];

        return diaInicial + "/" + mesInicial + "/" + anoInicial + " até " + diaFim + "/" + mesFim + "/" + anoFim;
    }
}

gerarUrl = (local) =>{
    var url = "local.html?idLocal=" + local.idLocal;
    return url;
}

limparExibidos = () => {
    $("#locais_de_atendimento").empty();
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
