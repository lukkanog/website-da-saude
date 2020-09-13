const section = document.querySelector("#servicos_cadastrados");
const loading = document.querySelector("#loading");
const formLoading = document.querySelector(".form_loading");
const form = document.querySelector("#servico_form");
const selectCategorias = document.querySelector("#categoria_servico");

var categoriasCadastradas = [];

var listaExibida = [];
var categoriasExibidas = [];


try{
    carregarServicos();
    carregarCategorias();
} catch(error){
    alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    window.location.href = "../index.html";
}


$("#add_button").click(function () {
    $("#modal_servico").toggleClass("escondido");


    form.addEventListener("submit", cadastrarServico);
})


$(".close_icon").click(function () {
    // esconde o formulario
    $(this).parent().parent().parent().toggleClass("escondido");

    // limpa todos os campos do formulario
    $("#local_form").trigger("reset");
    $("#servico_form").trigger("reset");
})


async function carregarServicos(){
    let url = "http://lukkanog-001-site1.ftempurl.com/api/servicos";

    await fetch(url)
    .then(response => response.json())
    .then(data => {
        pararDeCarregar();

        preencherConteudo(data);
        console.table(data);
    })
    .catch(error => console.log(error))
}

preencherConteudo = (servicos) => {
    listaExibida = servicos;

    servicos.forEach(item => {
        ({idServico, idCategoria, idCategoriaNavigation : categoria, nomeServico} = item);

        var dropdown = document.createElement("div");
        dropdown.className = "dropdown";
        
        var botao = document.createElement("div");
        botao.className = "btn_dropdown";
        botao.setAttribute("role", "button");
        botao.setAttribute("aria-haspopup","true");
        botao.setAttribute("aria-expanded","false");

        var titulo = document.createElement("h3");
        titulo.textContent = nomeServico;

        var verMais = document.createElement("div");
        verMais.className = "ver_mais";
        
        var setinha = document.createElement("img");
        setinha.src="../../assets/img/arrow-icon.png.png";
        setinha.alt = "";

        verMais.appendChild(setinha);
        botao.append(titulo, verMais);

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
        idTexto.textContent = "Id do serviço";

        var idValor = document.createElement("p");
        idValor.className = "valor";
        idValor.textContent = idServico;
        
        divId.append(idTexto,idValor);

        var divCategoria = document.createElement("div");
        divCategoria.className = "caracteristica";

        var categoriaTexto = document.createElement("p");
        categoriaTexto.className = "smaller";
        categoriaTexto.textContent = "Categoria";

        var categoriaValor = document.createElement("p");
        categoriaValor.className = "valor";
        categoriaValor.textContent = categoria.nomeCategoria;
        
        divCategoria.append(categoriaTexto,categoriaValor);

        caracteristicasGroup.append(divId,divCategoria);
        
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

        conteudo.append(flex);
        dropdown.append(botao,conteudo);
        

        $(botao).click(function () {

            // mostra/ esconde a lista de servicos e etc
            $(this).parent().children(".dropdown_content").slideToggle();
        
            //vira a setinha pra cima/pra baixo
            $(this).children(".ver_mais").children("img").toggleClass("turned");
        });

        $(botaoExcluir).click(function () {
            gerarModalExcluir(item.idServico);
        });

        $(botaoEditar).click(function () {
            $("#nome_servico").val(item.nomeServico);
            $("#categoria_servico").val(item.idCategoria);
           

            $("#modal_servico").toggleClass("escondido");
            // faz com que o formulario nao cadastre, e sim edite o local
            form.removeEventListener("submit", cadastrarServico);
            form.addEventListener("submit",() => editarServico(item.idServico));
        })

        
        
        section.appendChild(dropdown);


    })
}

cadastrarServico = async() => {
    event.preventDefault();
    começarACarregarForm();

    let url = "http://lukkanog-001-site1.ftempurl.com/api/servicos";
    let token = localStorage.getItem("portalDaSaude-token");

    let requestbody = {
        idCategoria : $("#categoria_servico").val(),
        nomeServico : $("#nome_servico").val()
    }

    await fetch(url,{
        method : "POST",
        headers : {
            "Authorization" : "Bearer " + token,
            "Content-type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(requestbody)
    })
    .then(response => response.json())
    .then(data => {
        if (data.erro === undefined){
            alert(data.mensagem);
            window.location.reload();
        }
    })
    .catch(error => console.log(error))
}


editarServico = async(idServico) => {
    event.preventDefault();
    começarACarregarForm();

    let url = "http://lukkanog-001-site1.ftempurl.com/api/servicos/" + idServico;
    let token = localStorage.getItem("portalDaSaude-token");

    let requestbody = {
        idCategoria : $("#categoria_servico").val(),
        nomeServico : $("#nome_servico").val()
    }

    await fetch(url,{
        method : "PUT",
        headers : {
            "Authorization" : "Bearer " + token,
            "Content-type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(requestbody)
    })
    .then(response => response.json())
    .then(data => {
        if (data.erro === undefined){
            alert(data.mensagem);
            window.location.reload();
        }
    })
    .catch(error => console.log(error))
}


gerarModalExcluir = (idServico) =>{
    var servicoSelecionado = listaExibida.find(x => x.idServico == idServico);

    var modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal_excluir";

    var modalContent = document.createElement("div");
    modalContent.className = "modal_content";

    var titulo = document.createElement("h2");
    titulo.className = "form_title";
    titulo.textContent = 'Deseja excluir o serviço "'  + servicoSelecionado.nomeServico + '"?';

    var aviso = document.createElement("p");
    aviso.className= "delete-observation";
    aviso.textContent = "Observação: Não será possível excluir serviço se o mesmo estiver cadastrado em um ou mais locais (verificar página Locais de Atendimento).";


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
        excluirServico(idServico);
    })

    
    botoes.append(botaoExcluir, botaoCancelar);
    modalContent.append(titulo, aviso, botoes);
    modal.appendChild(modalContent);
    
    $(modal).insertBefore($("#servicos_cadastrados"));
}


excluirServico = async(idServico) => {
    event.preventDefault();

    let url = "http://lukkanog-001-site1.ftempurl.com/api/servicos/" + idServico;
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



async function carregarCategorias(){
    let url = "http://lukkanog-001-site1.ftempurl.com/api/categorias";

    await fetch(url)
    .then(response => response.json())
    .then(data => {
        preencherCategorias(data);
    })
    .catch(error => console.log(error))
}


pararDeCarregar = () => {
    loading.remove();
}

preencherCategorias = (categorias) => {
    categoriasExibidas = categorias;

    categorias.forEach(item => {
        var option = document.createElement("option");
        option.value = item.idCategoria;
        option.label = item.nomeCategoria;
        option.className = "categoria_option";

        selectCategorias.appendChild(option);
    })
}



começarACarregarForm = () => {
    form.className = "escondido";
    formLoading.classList.remove("escondido");
}

pararDeCarregarForm = () => {
    form.classList.remove("escondido");
    formLoading.className = "escondido";
}