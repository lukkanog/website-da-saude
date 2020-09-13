const section = document.querySelector("#categorias_cadastradas");
const form = document.querySelector("#categoria_form");
const loading = document.querySelector("#loading");
const formLoading = document.querySelector(".form_loading");

var categoriasCadastradas = [];
var listaExibida = [];

try{
    carregarCategorias();
} catch(error){
    alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    window.location.href = "../index.html";
}


$("#add_button").click(function () {
    $("#modal_categoria").toggleClass("escondido");

    form.addEventListener("submit", cadastrarCategoria);
})


async function carregarCategorias(){
    let url = "http://lukkanog-001-site1.ftempurl.com/api/categorias";

    await fetch(url)
    .then(response => response.json())
    .then(data => {
        pararDeCarregar();
        preencherConteudo(data);
    })
    .catch(error => console.log(error))
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

preencherConteudo = (categorias) => {
    listaExibida = categorias;

    categorias.forEach(item => {
        ({idCategoria, nomeCategoria} = item);

        var dropdown = document.createElement("div");
        dropdown.className = "dropdown";
        
        var botao = document.createElement("div");
        botao.className = "btn_dropdown";
        botao.setAttribute("role", "button");
        botao.setAttribute("aria-haspopup","true");
        botao.setAttribute("aria-expanded","false");

        var titulo = document.createElement("h3");
        titulo.textContent = nomeCategoria;

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
        idTexto.textContent = "Id da categoria";

        var idValor = document.createElement("p");
        idValor.className = "valor";
        idValor.textContent = idCategoria;
        
        divId.append(idTexto,idValor);
    
        caracteristicasGroup.append(divId);
        
        var opcoesGroup = document.createElement("div");
        opcoesGroup.className = "opcoes";

        var botaoExcluir = document.createElement("span");
        botaoExcluir.className="option delete";

        var deleteIcon = document.createElement("img");
        deleteIcon.className = "option_icon";
        deleteIcon.src = "../../assets/img/delete-icon.png";
        botaoExcluir.appendChild(deleteIcon);
        
        opcoesGroup.append(botaoExcluir);

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
            gerarModalExcluir(item.idCategoria);
        });

        
        
        section.appendChild(dropdown);
    })
}


cadastrarCategoria = async() => {
    event.preventDefault();
    começarACarregarForm();

    let url = "http://lukkanog-001-site1.ftempurl.com/api/categorias";
    let token = localStorage.getItem("portalDaSaude-token");

    let requestbody = {
        nomeCategoria : $("#nome_categoria").val(),
    };

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

gerarModalExcluir = (idCategoria) => {
    var categoriaSelecionada = listaExibida.find(x => x.idCategoria == idCategoria);

    var modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal_excluir";

    var modalContent = document.createElement("div");
    modalContent.className = "modal_content";

    var titulo = document.createElement("h2");
    titulo.className = "form_title";
    titulo.textContent = 'Deseja excluir a categoria "'  + categoriaSelecionada.nomeCategoria + '"?';

    var aviso = document.createElement("p");
    aviso.className= "delete-observation";
    aviso.textContent = "Observação: Não será possível excluir a categoria se houverem serviços vinculados a esta.";

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
        excluirCategoria(idCategoria);
    })

    
    botoes.append(botaoExcluir, botaoCancelar);
    modalContent.append(titulo,aviso,  botoes);
    modal.appendChild(modalContent);
    
    $(modal).insertBefore($("#categorias_cadastradas"));
}


excluirCategoria = async(idCategoria) => {
    event.preventDefault();

    let url = "http://lukkanog-001-site1.ftempurl.com/api/categorias/" + idCategoria;
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
