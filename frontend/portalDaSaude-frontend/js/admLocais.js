const section = document.querySelector("#locais_cadastrados");
const loading = document.querySelector("#loading");

const form = document.querySelector("#local_form");
const formServico = document.querySelector("#servico_form");
const inputCep = document.querySelector("#cep");
const selectBairro = document.querySelector("#bairro");
const selectTipo = document.querySelector("#tipo_local");
const deleteServico = document.querySelector("#remover_servico");
const formLoading = document.querySelector(".form_loading");
const formServicoLoading = document.querySelector(".form_servico_loading");


const selectServico = document.querySelector("#servico");
const selectSituacao = document.querySelector("#situacao");

var bairrosCadastrados = [];
var tiposCadastrados = [];

var servicosCadastrados = [];
var situacoesCadastradas = [];

var listaExibida = [];

try{
    carregarLocaisEServicos();
    carregarBairros();
    carregarTipos();
    carregarServicos();
    carregarSituacoes();
} catch(error){
    alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    window.location.href = "../index.html";
}

$("#add_button").click(function () {
    $("#modal_local").toggleClass("escondido");

    // faz com que o formulario seja usado para salvar um novo local e nao editar um existente
    try {
        form.removeEventListener("submit",editarLocal);
    } catch (error) {
        
    }
    form.addEventListener("submit", cadastrarLocal);
})


$(".close_icon").click(function () {
    // esconde o formulario
    $(this).parent().parent().parent().toggleClass("escondido");
    
    if (!deleteServico.classList.contains("escondido")){
        deleteServico.classList.add("escondido");
    }

    // limpa todos os campos do formulario
    $("#local_form").trigger("reset");
    $("#servico_form").trigger("reset");
})



async function carregarLocaisEServicos(){
    let url = "http://lukkanog-001-site1.ftempurl.com/api/locais/servicos";
    
    await fetch(url)
        .then(response => response.json())
        .then(data =>{
            pararDeCarregar();
            listaExibida = data;
            preencherConteudo();
        })
        .catch(error => {
            console.log(error);

        })
}

preencherConteudo = () =>{
    listaExibida.forEach(item =>{
        ({idLocal : id, nomeLocal, cep, logradouro, numero, idBairro, idTipoLocal, capacidade, telefone, idBairroNavigation, servicosPrestados : servicos } = item);

        var dropdown = document.createElement("div");
        dropdown.className = "dropdown";
        
        var botao = document.createElement("div");
        botao.className = "btn_dropdown";
        botao.setAttribute("role", "button");
        botao.setAttribute("aria-haspopup","true");
        botao.setAttribute("aria-expanded","false");

        var titulo = document.createElement("h3");
        titulo.textContent = nomeLocal;

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
        idValor.textContent = id;
        
        divId.append(idTexto,idValor);

        var divEndereco = document.createElement("div");
        divId.className = "caracteristica";

        var enderecoTexto = document.createElement("p");
        enderecoTexto.className = "smaller";
        enderecoTexto.textContent = "Endereço";

        var enderecoValor = document.createElement("p");
        enderecoValor.className = "valor";
        enderecoValor.textContent = logradouro + ", " + numero;

        divEndereco.append(enderecoTexto,enderecoValor);

        var divBairro = document.createElement("div");
        divBairro.className = "caracteristica";

        var bairroTexto = document.createElement("p");
        bairroTexto.className = "smaller";
        bairroTexto.textContent = "Bairro";

        var bairroValor = document.createElement("p");
        bairroValor.className = "valor";
        bairroValor.textContent = idBairroNavigation.nomeBairro;

        divBairro.append(bairroTexto,bairroValor);

        var divCep = document.createElement("div");
        divCep.className = "caracteristica";

        var cepTexto = document.createElement("p");
        cepTexto.className = "smaller";
        cepTexto.textContent = "CEP";

        var cepValor = document.createElement("p");
        cepValor.className = "valor";
        cepValor.textContent = cep;
        
        divCep.append(cepTexto,cepValor);

        

        caracteristicasGroup.append(divId,divEndereco,divBairro,divCep);

        if (telefone !== null && telefone !== undefined){
            var divTelefone = document.createElement("div");
            divTelefone.className = "caracteristica";

            var telefoneTexto = document.createElement("p");
            telefoneTexto.className = "smaller";
            telefoneTexto.textContent = "Telefone";

            var telefoneValor = document.createElement("p");
            telefoneValor.className = "valor";
            telefoneValor.textContent = telefone;
            
            divTelefone.append(telefoneTexto,telefoneValor);
            caracteristicasGroup.append(divTelefone);
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
        
        var servicosTitulo = document.createElement("p");
        servicosTitulo.className = "dropdown-header";
        servicosTitulo.textContent = "Serviços oferecidos";


        var listaServicos = document.createElement("ul");
        listaServicos.className = "dropdown-menu";

        var addServico = document.createElement("li");
        addServico.className = "dropdown-item add_item";
        var addIcon = document.createElement("img");
        addIcon.src="../../assets/img/add-icon.png"
        addIcon.alt = "Adicionar serviço";
        
        addServico.appendChild(addIcon);
        listaServicos.appendChild(addServico);

        servicos.forEach(element => {
            var opcao = document.createElement("li");
            opcao.className = "dropdown-item";

            var submenu = document.createElement("img");
            submenu.className = "submenu_icon";
            submenu.src = "../../assets/img/submenu-icon.png";
            submenu.alt = "Opções";

            var nomeServico = document.createElement("p");
            nomeServico.className = "item_title";
            nomeServico.textContent = element.idServicoNavigation.nomeServico;

            var nomeCategoria = document.createElement("p");
            nomeCategoria.className = "item_subtitle";
            nomeCategoria.textContent = element.idServicoNavigation.idCategoriaNavigation.nomeCategoria;

            opcao.append(submenu, nomeServico, nomeCategoria);
            listaServicos.appendChild(opcao);

            $(submenu).click(function(){
                gerarModalEditarServico(element);
            })
        })

        conteudo.append(flex, servicosTitulo, listaServicos);
        dropdown.append(botao,conteudo);
        

        $(botao).click(function () {

            // mostra/ esconde a lista de servicos e etc
            $(this).parent().children(".dropdown_content").slideToggle();
        
            //vira a setinha pra cima/pra baixo
            $(this).children(".ver_mais").children("img").toggleClass("turned");
        });

        $(botaoEditar).click(function () {
            $("#nome_local").val(item.nomeLocal);
            $("#bairro").val(item.idBairro);
            $("#tipo_local").val(item.idTipoLocal);
            $("#cep").val(item.cep);
            $("#logradouro").val(item.logradouro);
            $("#numero").val(item.numero);
            item.capacidade == null ? null : $("#capacidade").val(item.capacidade);

            $("#modal_local").toggleClass("escondido");
            // faz com que o formulario nao cadastre, e sim edite o local
            form.removeEventListener("submit", cadastrarLocal);
            form.addEventListener("submit",() => editarLocal(item.idLocal));
        })

        $(botaoExcluir).click(function () {
            gerarModalExcluir(item.idLocal);
        })

        $(addServico).click(function(){
            $("#modal_servico").toggleClass("escondido");
            preencherModalServico(item);
        })
        
        section.appendChild(dropdown);
    })
}


// TO DO 
gerarModalEditarServico = (servico) => {

    
    ( { idServicoNavigation, idLocalNavigation : local, idLocal, idServico, idSituacao } = servico)

    //FIX ME - na primeira vez q abre o modal ele da erro
    $("#servico").val(idServico);
    $("#situacao").val(idSituacao);

        
    $("#modal_servico").toggleClass("escondido");
    
    if (deleteServico.classList.contains("escondido")){
        deleteServico.classList.remove("escondido")
    }

    formServico.addEventListener("submit",() => {
        editarServico(idLocal);
    });

    // o unbind evita que essa funcao seja chamada multiplas vezes
    $("#remover_servico").unbind().click(() => excluirServicoDeLocal(servico));

}

async function editarServico(idLocal){
    event.preventDefault();
    começarACarregarForm();

    let servico = document.querySelector("#servico").value;
    let situacao = document.querySelector("#situacao").value;

    let requestBody = {
        idLocal: idLocal,
        idServico: servico,
        idSituacao: situacao,
    }


    let url = "http://lukkanog-001-site1.ftempurl.com/api/ServicosPrestados";
    let token = localStorage.getItem("portalDaSaude-token");

    await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then(data => alert(data.mensagem))
        .catch(error => console.log(error))

    window.location.reload();

}


preencherModalServico = (local) =>{

    formServico.addEventListener("submit",() => cadastrarServico(local));
}



cadastrarServico = async(local) => {
    event.preventDefault();
    começarACarregarForm();
    
    let servico = document.querySelector("#servico").value;
    let situacao = document.querySelector("#situacao").value;

    var servicoJaExistente = local.servicosPrestados.find(x => x.idServico == servico);

    if (servicoJaExistente === null || servicoJaExistente === undefined){
        let requestBody = {
            idLocal: local.idLocal,
            idServico: servico,
            idSituacao: situacao,
        }

        let url = "http://lukkanog-001-site1.ftempurl.com/api/ServicosPrestados";
        let token = localStorage.getItem("portalDaSaude-token");

        await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                if (data.erro === undefined){
                    alert(data.mensagem);
                } else{
                    alert("Ocorreu um erro inesperado: " + data.mensagem);
                }
            })
            .catch(error => console.log(error))

        window.location.reload();
    } else {
        alert("Esse serviço já existe nesse local.");
        pararDeCarregarForm();
    }
    
    

}

excluirServicoDeLocal = async(servico) => {


    começarACarregarForm();
    let token = localStorage.getItem("portalDaSaude-token");
    let url = "http://lukkanog-001-site1.ftempurl.com/api/servicosprestados/";

    let requestBody = {
        idLocal : idLocal,
        idServico : idServico,
    }

    await fetch (url,{
        method: "DELETE",
        headers: {
            "Authorization" : "Bearer " + token,
            "Content-type" : "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensagem);
        window.location.reload();
    })
    .catch(error => {
        console.log(error);

    })
}


async function carregarServicos(){
    let url = "http://lukkanog-001-site1.ftempurl.com/api/servicos";

    await fetch (url)
    .then(response => response.json())
    .then(data => {
        servicosCadastrados = data;
        servicosCadastrados.forEach(item => {
            var option = document.createElement("option");
            option.value = item.idServico;
            option.label = item.nomeServico + " - " + item.idCategoriaNavigation.nomeCategoria;
            option.className = "servico_option";

            selectServico.appendChild(option);
        })
    })
    .catch(error => console.log(error))
}

async function carregarSituacoes(){
    let url = "http://lukkanog-001-site1.ftempurl.com/api/situacoes";

    await fetch (url)
    .then(response => response.json())
    .then(data => {
        situacoesCadastradas = data;
        situacoesCadastradas.forEach(item => {
            var option = document.createElement("option");
            option.value = item.idSituacao;
            option.label = item.nomeSituacao + " (" + item.descricao + ")";
            option.className = "situacao_option";

            selectSituacao.appendChild(option);
        })
    })
    .catch(error => console.log(error))
}


gerarModalExcluir = (idLocal) =>{
    var localSelecionado = listaExibida.find(x => x.idLocal == idLocal);

    var modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal_excluir";

    var modalContent = document.createElement("div");
    modalContent.className = "modal_content";

    var titulo = document.createElement("h2");
    titulo.className = "form_title";
    titulo.textContent = 'Deseja excluir o local "'  + localSelecionado.nomeLocal + '"?';

    var aviso = document.createElement("p");
    aviso.className= "delete-observation";
    aviso.textContent = "Observação: Não será possível excluir o local se o mesmo conter serviços cadastrados no momento.";

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
        excluirLocal(idLocal);
    })

    
    botoes.append(botaoExcluir, botaoCancelar);
    modalContent.append(titulo, aviso, botoes);
    modal.appendChild(modalContent);
    
    $(modal).insertBefore($("#modal_local"));
}

async function excluirLocal(id){
    let token = localStorage.getItem("portalDaSaude-token");
    let url = "http://lukkanog-001-site1.ftempurl.com/api/locais/" + id;

    await fetch (url,{
        method: "DELETE",
        headers: {
            "Authorization" : "Bearer " + token,
            "Content-type" : "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensagem);
        $("#modal_excluir").remove();
        window.location.reload();
    })
    .catch(error => {
        console.log(error);

    })
}


async function carregarBairros() {
    var url = "http://lukkanog-001-site1.ftempurl.com/api/bairros";
    await fetch(url)
        .then(response => response.json())
        .then(data => preencherBairros(data))
        .catch(error => {
            console.log(error);
        })
}


preencherBairros = (bairros) => {
    bairrosCadastrados = bairros;
    bairros.forEach(item => {
        var option = document.createElement("option");
        option.value = item.idBairro;
        option.label = item.nomeBairro;
        option.className = "bairro_option";

        selectBairro.appendChild(option);
    })
}


async function carregarTipos() {
    var url = "http://lukkanog-001-site1.ftempurl.com/api/tiposlocais";
    await fetch(url)
        .then(response => response.json())
        .then(data => preencherTiposDeLocais(data))
        .catch(error => {
            console.log(error);
        })
}

preencherTiposDeLocais = (tipos) => {
    tiposCadastrados = tipos;
    tipos.forEach(item => {
        var option = document.createElement("option");
        option.value = item.idTipoLocal;
        option.label = item.nomeTipolocal;
        option.className = "tipo_option"

        selectTipo.appendChild(option);
    })
}

//criado com o plugin do jquery presente nos assets
$("#cep").mask("00000-000");
$("#telefone").mask("(00) 0000-0000");


$("#cep").change(() => {
    let valor = $("#cep").val();

    if (valor.length === 8 || valor.length === 9) {
        try {
            let caracteres = valor.split("");
            let arrayCep = caracteres.filter(x => x != "-");
            let cep = arrayCep.join("");

            procurarCep(cep);

        } catch (error) {
            console.warn(error);
        }
    }
})

async function procurarCep(cep) {
    try {

        await $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

            if (!("erro" in dados)) {
                //Atualiza os campos com os valores da consulta.
                $("#logradouro").val(dados.logradouro);
                mudarBairroSelecionado(dados.bairro);
            } //end if.
            else {
                //CEP pesquisado não foi encontrado.
                limpa_formulario_cep();
                alert("CEP não encontrado.");
            }
        });

    } catch (error) {
        console.warn(error);
    }
}

mudarBairroSelecionado = (nomeBairro) => {
    bairroSelecionado = bairrosCadastrados.find(x => x.nomeBairro == nomeBairro);

    if (bairroSelecionado !== null && bairroSelecionado !== undefined) {
        $("#bairro").val(bairroSelecionado.idBairro);
    }

}

function limpa_formulario_cep() {
    // Limpa valores do formulário de cep.
    $("#logradouro").val("");
    // $("#bairro").val("");
    // $("#cidade").val("");
    // $("#uf").val("");
    // $("#ibge").val("");
}

pararDeCarregar = () => {
    loading.remove();
}


cadastrarLocal = async(event) =>{
    event.preventDefault();
    começarACarregarForm();


    let nomeLocal = document.querySelector("#nome_local").value;
    let idTipoLocal = document.querySelector("#tipo_local").value;
    let idBairro = document.querySelector("#bairro").value;
    let cep = document.querySelector("#cep").value;
    let logradouro = document.querySelector("#logradouro").value;
    let numero = document.querySelector("#numero").value;
    let capacidade = document.querySelector("#capacidade").value;
    let telefone = document.querySelector("#telefone").value;


    let requestBody = {
        nomeLocal : nomeLocal,
        idTipoLocal : idTipoLocal,
        idBairro : idBairro,
        cep : cep,
        logradouro : logradouro,
        numero : numero,
        capacidade : capacidade == null || capacidade == "" || capacidade == undefined ? null : capacidade,
        telefone : telefone == null || telefone == "" || telefone == undefined ? null : telefone,

    }


    let token = localStorage.getItem("portalDaSaude-token");
    let url = "http://lukkanog-001-site1.ftempurl.com/api/locais";

    await fetch (url,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token
        },
        body : JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        if (data.erro === undefined){
            alert(data.mensagem);
        } else{
            alert("Ocorreu um erro inesperado: " + data.mensagem);
        }
    }) 
    .catch(error => {
        console.log(error);
    })
    window.location.reload();

}


editarLocal = async(id) =>{
    event.preventDefault();
    começarACarregarForm();

    let nomeLocal = document.querySelector("#nome_local").value;
    let idTipoLocal = document.querySelector("#tipo_local").value;
    let idBairro = document.querySelector("#bairro").value;
    let cep = document.querySelector("#cep").value;
    let logradouro = document.querySelector("#logradouro").value;
    let numero = document.querySelector("#numero").value;

    let requestBody = {
        nomeLocal : nomeLocal,
        idTipoLocal : idTipoLocal,
        idBairro : idBairro,
        cep : cep,
        logradouro : logradouro,
        numero : numero,
        capacidade : capacidade == null || capacidade == "" || capacidade == undefined ? null : capacidade,

    }

    let token = localStorage.getItem("portalDaSaude-token");
    let url = "http://lukkanog-001-site1.ftempurl.com/api/locais/" + id;



    await fetch (url,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token
        },
        body : JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        if (data.erro === undefined){
            alert(data.mensagem);
        } else{
            alert("Ocorreu um erro inesperado: " + data.mensagem);
        }
    })    
    .catch(error => {
        console.log(error);
    })

    window.location.reload();
}

começarACarregarForm = () => {
    form.classList.add("escondido");
    deleteServico.classList.add("escondido");
    formServico.classList.add("escondido");
    formLoading.classList.remove("escondido");
    formServicoLoading.classList.remove("escondido");
}

pararDeCarregarForm = () => {
    form.classList.remove("escondido");
    formLoading.classList.add("escondido");
    formServico.classList.remove("escondido");
    formServicoLoading.classList.add("escondido");
}