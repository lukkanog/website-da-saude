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


async function carregarBairros(){
    var url = "http://localhost:5000/api/bairros";
    await fetch(url)
    .then(response => response.json())
    .then(data => preencherBairros(data))
    .catch(error => console.log(error))
}


preencherBairros = (bairros) =>{
    bairrosCadastrados = bairros;
    bairros.forEach(item =>{
        var option = document.createElement("option");
        option.value = item.idBairro;
        option.label = item.nomeBairro;
        option.className = "bairro_option";

        selectBairro.appendChild(option);
    })
}


async function carregarTipos(){
    var url = "http://localhost:5000/api/tiposlocais";
    await fetch(url)
    .then(response => response.json())
    .then(data => preencherTiposDeLocais(data))
    .catch(error => console.log(error))
}

preencherTiposDeLocais = (tipos) =>{
    tiposCadastrados = tipos;
    tipos.forEach(item =>{
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

        await $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

            if (!("erro" in dados)) {
                //Atualiza os campos com os valores da consulta.
                $("#logradouro").val(dados.logradouro);
                mudarBairroSelecionado(dados.bairro);

                console.log(dados);
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

mudarBairroSelecionado = (nomeBairro) =>{
    bairroSelecionado = bairrosCadastrados.find(x => x.nomeBairro == nomeBairro);

    if (bairroSelecionado !== null){
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
