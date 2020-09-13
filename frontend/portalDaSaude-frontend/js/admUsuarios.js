const selectBairro = document.querySelector("#bairro");
const form = document.querySelector("#cadastrar_usuario");
const submit = document.querySelector("#submit_user");
// // const section = document.querySelector("#locais_cadastrados");
// const loading = document.querySelector("#loading");

carregarBairros();
$("#cep").mask("99999-999");


cadastrarUsuario = async(event) => {
    event.preventDefault();
    submit.setAttribute("enabled","false");

    if ($("#senha").val() !== $("#confirmar_senha").val()) {
        alert("Por favor, confirme sua senha corretamente")
    } else {

        // IMPORTANTE DEIXAR O IDPERMISSAO COMO 2
        const idPermissao = 2;


        let requestBody = {
            idPermissao: idPermissao,
            nomeUsuario: $("#nome_usuario").val(),
            dataNascimento: $("#nascimento_usuario").val(),
            email: $("#email").val(),
            senha: $("#senha").val(),
            idBairro : $("#bairro").val(),
            cep: $("#cep").val() === "" ? null : $("#cep").val(),
            logradouro: $("#logradouro").val() === "" ? null : $("#logradouro").val(),
            numero: $("#numero").val(),
        }

        let token = localStorage.getItem("portalDaSaude-token");
        const url = "http://lukkanog-001-site1.ftempurl.com/api/usuarios";

        fetch(url,{
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(requestBody)
        })
        .then(resposta => resposta.json())
        .then(data => {
            alert(data.mensagem);
            submit.setAttribute("enabled","true");
            limparFormulario();

        })
        .catch(error => {
            console.log(error);
            window.location.reload();
        })


    }
}

form.addEventListener("submit",cadastrarUsuario);


limparFormulario = () => {
    $("#cadastrar_usuario").trigger("reset");
}


async function carregarBairros() {
    var url = "http://lukkanog-001-site1.ftempurl.com/api/bairros";
    await fetch(url)
        .then(response => response.json())
        .then(data => preencherBairros(data))
        .catch(error => {
            console.log(error);
            alert("Ocorreu um erro ao carregar os bairros cadastrados. Tente novamente mais tarde.");
            window.location.href = "admin.html";
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