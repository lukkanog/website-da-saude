const section = document.querySelector("#locais_cadastrados");
const loading = document.querySelector("#loading");

const form = document.querySelector("#local_form");
const inputCep = document.querySelector("#cep");
const selectBairro = document.querySelector("#bairro");
const selectTipo = document.querySelector("#tipo_local");

var bairrosCadastrados = [];
var tiposCadastrados = [];


carregarBairros();
carregarTipos();


async function carregarBairros() {
    var url = "http://localhost:5000/api/bairros";
    await fetch(url)
        .then(response => response.json())
        .then(data => preencherBairros(data))
        .catch(error => console.log(error))
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
    var url = "http://localhost:5000/api/tiposlocais";
    await fetch(url)
        .then(response => response.json())
        .then(data => preencherTiposDeLocais(data))
        .catch(error => console.log(error))
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
$("#cep").mask("99999-999");
//

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

$("#add_button").click(function () {
    console.log("add")
    $("#modal_local").toggleClass("escondido");

    // faz com que o formulario seja usado para salvar um novo local e nao editar um existente
    try {
        form.removeEventListener("submit",editarLocal);
    } catch (error) {
        
    }


    form.addEventListener("submit", cadastrarLocal);


})


$(".close_icon").click(function () {
    $("#modal_local").toggleClass("escondido");
})



$(".btn_dropdown").click(function () {

    // mostra/ esconde a lista de servicos e etc
    $(this).parent().children(".dropdown_content").slideToggle();

    //vira a setinha pra cima/pra baixo
    $(this).children(".ver_mais").children("img").toggleClass("turned");
});

pararDeCarregar = () => {
    loading.remove();
}


cadastrarLocal = async(event) =>{
    event.preventDefault();
    let nomeLocal = document.querySelector("#nome_local").value;
    let idTipoLocal = document.querySelector("#tipo_local").value;
    let idBairro = document.querySelector("#bairro").value;
    let cep = document.querySelector("#cep").value;
    let logradouro = document.querySelector("#logradouro").value;
    let numero = document.querySelector("#numero").value;
    let capacidade = document.querySelector("#capacidade").value;

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
    let url = "http://localhost:5000/api/locais";

    await fetch (url,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token
        },
        body : JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => alert(data.mensagem))
    .catch(error => alert(error))

}