const section = document.querySelector("#eventos_cadastrados");
const loading = document.querySelector("#loading");
const formLoading = document.querySelector(".form_loading");

const form = document.querySelector("#evento_form");


var listaExibida = [];

try {
    carregarEventos();
    // carregarLocais();
} catch (error) {
    alert("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
    window.location.href = "../index.html";
}


$("#add_button").click(function () {
    console.log("add")
    $("#modal_evento").toggleClass("escondido");

    form.addEventListener("submit", cadastrarEvento);
})


$(".close_icon").click(function () {
    // esconde o formulario
    $(this).parent().parent().parent().toggleClass("escondido");

    // limpa todos os campos do formulario
    $("#evento_form").trigger("reset");
})


async function carregarEventos(){
    let url = "http://localhost:5000/api/eventos/locais";

    await fetch(url)
    .then(response => response.json())
    .then(data =>{
        pararDeCarregar();
        listaExibida = data;
        preencherConteudo();
    })
    .catch(error => {
        console.log(error);
        // alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        // window.location.href = "admin.html";
    })
}


cadastrarEvento = async() => {
    event.preventDefault();
    começarACarregarForm();


    let url = "http://localhost:5000/api/eventos";
    let token = localStorage.getItem("portalDaSaude-token");

    let requestBody = {
        nomeEvento : $("#nome_evento").val(),
        dataInicio : $("#data_inicio").val(),
        dataTermino : $("#data_termino").val(),
        descricao : $("#descricao").val()
    };

    await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then(data => alert(data.mensagem))
        .catch(error => alert(error))

    window.location.reload();

}


preencherConteudo = () => {
    console.table(listaExibida)
    
    listaExibida.forEach(item => {
        ({idEvento, nomeEvento, descricao, dataInicio, dataTermino, locaisEventos : locais} = item);

        var dropdown = document.createElement("div");
        dropdown.className = "dropdown";
        
        var botao = document.createElement("div");
        botao.className = "btn_dropdown";
        botao.setAttribute("role", "button");
        botao.setAttribute("aria-haspopup","true");
        botao.setAttribute("aria-expanded","false");

        var titulo = document.createElement("h3");
        titulo.textContent = nomeEvento;

        var verMais = document.createElement("div");
        verMais.className = "ver_mais";
        
        var setinha = document.createElement("img");
        setinha.src="../../assets/img/arrow-icon.png.png";
        setinha.alt = "";

        verMais.appendChild(setinha);
        botao.append(titulo, verMais);

        // conteudo que expande/minimiza
        var conteudo = document.createElement("div");
        conteudo.className="dropdown_content";

        var flex = document.createElement("div");
        flex.className = "dropdown_flex";

        var caracteristicasGroup = document.createElement("div");
        caracteristicasGroup.className = "caracteristicas";

        var divId = document.createElement("div");
        divId.className = "caracteristica";

        var idTexto = document.createElement("p");
        idTexto.className = "smaller";
        idTexto.textContent = "Id";

        var idValor = document.createElement("p");
        idValor.className = "valor";
        idValor.textContent = idEvento;
        
        divId.append(idTexto,idValor);

        var divDescricao = document.createElement("div");
        divDescricao.className = "caracteristica";

        var descricaoTexto = document.createElement("p");
        descricaoTexto.className = "smaller";
        descricaoTexto.textContent = "Descrição";

        var descricaoValor = document.createElement("p");
        descricaoValor.className = "valor";
        descricaoValor.textContent = descricao;
        descricaoValor.style = "font-size: 1em; padding-right: 10px";

        divDescricao.append(descricaoTexto,descricaoValor);


        caracteristicasGroup.append(divId,divDescricao);

        if (dataInicio !== undefined && dataInicio !== null && dataTermino !== undefined && dataTermino !== null){
            var divData = document.createElement("div");
            divData.className = "caracteristica";

            var dataTexto = document.createElement("p");
            dataTexto.className = "smaller";
            dataTexto.textContent = "Data";

            var dataValor = document.createElement("p");
            dataValor.className = "valor";
            dataValor.textContent = formatarData(item);

            divData.append(dataTexto, dataValor);
            caracteristicasGroup.append(divData);
        }
        
        var opcoesGroup = document.createElement("div");
        opcoesGroup.className = "opcoes";

        var botaoEditar = document.createElement("span");
        botaoEditar.className="option edit";

        var editIcon = document.createElement("img");
        editIcon.className = "option_icon";
        editIcon.src = "../../assets/img/edit-icon.png";
        
        botaoEditar.appendChild(editIcon);

        var botaoExcluir = document.createElement("span");
        botaoExcluir.className="option delete";

        var deleteIcon = document.createElement("img");
        deleteIcon.className = "option_icon";
        deleteIcon.src = "../../assets/img/delete-icon.png";
        botaoExcluir.appendChild(deleteIcon);
        
        opcoesGroup.append(botaoEditar,botaoExcluir);

        flex.append(caracteristicasGroup,opcoesGroup);
        
        var locaisTitulo = document.createElement("p");
        locaisTitulo.className = "dropdown-header";
        locaisTitulo.textContent = "Locais da campanha";


        var listaLocais = document.createElement("ul");
        listaLocais.className = "dropdown-menu";

        var addLocal = document.createElement("li");
        addLocal.className = "dropdown-item add_item";
        var addIcon = document.createElement("img");
        addIcon.src="../../assets/img/add-icon.png";
        addIcon.alt = "Adicionar local";
        
        addLocal.appendChild(addIcon);
        listaLocais.appendChild(addLocal);

        locais.forEach(element => {
            var opcao = document.createElement("li");
            opcao.className = "dropdown-item";

            var submenu = document.createElement("img");
            submenu.className = "submenu_icon";
            submenu.src = "../../assets/img/submenu-icon.png";
            submenu.alt = "Opções";

            var nomeLocal = document.createElement("p");
            nomeLocal.className = "item_title";
            nomeLocal.textContent = element.idLocalNavigation.nomeLocal;

            // var idLocal = document.createElement("p");
            // idLocal.className = "item_subtitle";
            // idLocal.textContent = "#" + element.idLocal;

            opcao.append(submenu, nomeLocal);
            listaLocais.appendChild(opcao);
        })

        conteudo.append(flex, locaisTitulo, listaLocais);
        dropdown.append(botao,conteudo);
        

        $(botao).click(function () {

            // mostra/ esconde a lista de servicos e etc
            $(this).parent().children(".dropdown_content").slideToggle();
        
            //vira a setinha pra cima/pra baixo
            $(this).children(".ver_mais").children("img").toggleClass("turned");
        });

        // FIXME
        // $(botaoEditar).click(function () {
        //     $("#nome_local").val(item.nomeLocal);
        //     $("#bairro").val(item.idBairro);
        //     $("#tipo_local").val(item.idTipoLocal);
        //     $("#cep").val(item.cep);
        //     $("#logradouro").val(item.logradouro);
        //     $("#numero").val(item.numero);
        //     item.capacidade == null ? null : $("#capacidade").val(item.capacidade);

        //     $("#modal_local").toggleClass("escondido");
        //     // faz com que o formulario nao cadastre, e sim edite o local
        //     form.removeEventListener("submit", cadastrarLocal);
        //     form.addEventListener("submit",() => editarLocal(item.idLocal));
        // })

        $(botaoExcluir).click(function () {
            gerarModalExcluir(item.idEvento);
        })

        // $(addServico).click(function(){
        //     $("#modal_evento").toggleClass("escondido");
        //     preencherModalServico(item);
        // })
        
        section.appendChild(dropdown);
    })
}



gerarModalExcluir = (idEvento) =>{
    var eventoSelecionado = listaExibida.find(x => x.idEvento == idEvento);

    var modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal_excluir";
    var modalContent = document.createElement("div");
    modalContent.className = "modal_content";
    var titulo = document.createElement("h2");
    titulo.className = "form_title";
    titulo.textContent = 'Deseja excluir "'  + eventoSelecionado.nomeEvento + '"?';
    var botoes = document.createElement("div");
    botoes.className = "delete_options";

    var botaoExcluir = document.createElement("button");
    botaoExcluir.className = "botao";
    botaoExcluir.id = "botao_excluir";
    botaoExcluir.textContent = "Excluir";

    var botaoCancelar = document.createElement("button");
    botaoCancelar.className = "botao";
    botaoCancelar.id = "botao_cancelar";
    botaoCancelar.textContent = "Cancelar";


    $(botaoCancelar).click(function(){
        $(this).parent().parent().parent().remove();
    });

    $(botaoExcluir).click(function(){
        excluirEvento(idEvento);
    })

    
    botoes.append(botaoExcluir, botaoCancelar);
    modalContent.append(titulo, botoes);
    modal.appendChild(modalContent);
    
    $(modal).insertBefore(section);
}


excluirEvento = async(idEvento) => {
    event.preventDefault();
    event.preventDefault();

    let url = "http://localhost:5000/api/eventos/" + idEvento;
    let token = localStorage.getItem("portalDaSaude-token");


    await fetch(url,{
        method : "DELETE",
        headers : {
            "Authorization" : "Bearer " + token,
            "Content-type" : "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.erro === undefined){
            alert(data.mensagem);
            window.location.reload();
        }
    })
    .catch(error => alert(error))
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


        return diaInicial + "/" + mesInicial + "/" + anoInicial + " - " + diaFim + "/" + mesFim + "/" + anoFim;
    }
}

pararDeCarregar = () => {
    loading.remove();
}

começarACarregarForm = () => {
    form.className = "escondido";
    formLoading.classList.remove("escondido");
}

pararDeCarregarForm = () => {
    form.classList.remove("escondido");
    formLoading.className = "escondido";
}

