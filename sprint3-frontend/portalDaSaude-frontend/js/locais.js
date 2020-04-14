const section = document.querySelector("#locais_de_atendimento");
const filtroBairro = document.querySelector("#bairros");
const filtroTipo = document.querySelector("#tipos");
var divsExibidas = document.getElementsByClassName("local_box");

var locaisExibidos;

carregarLocais();
// carregarTipos();
// carregarBairros();

//   FIX ME - arruma os filtro

function carregarLocais(){
    var url = "http://localhost:5000/api/locais";
    fetch(url)
    .then(response => response.json())
    .then(data => {
        preencherConteudo(data);
    })
    .catch(error => console.log(error))
}

function preencherConteudo(locais){
    locaisExibidos = locais;


    locais.forEach(item => {
        try {
            var box = document.createElement("div");
            box.className = "local_box";
            
            var titulo = document.createElement("h3");
            titulo.textContent = item.nomeLocal;        
            box.appendChild(titulo);
            
            var divEndereco = document.createElement("div");
            divEndereco.className = "caracteristica";
            
            var textoEndereco = document.createElement("p");
            textoEndereco.textContent = "Endereço";
            textoEndereco.className = "smaller";
            
            var endereco = document.createElement("p");
            endereco.textContent = item.logradouro + ", " + item.numero;
            endereco.className = "valor";
            divEndereco.appendChild(textoEndereco);
            divEndereco.appendChild(endereco);


            var divBairro = document.createElement("div");
            divBairro.className = "caracteristica";
            
            var textoBairro = document.createElement("p");
            textoBairro.textContent = "Bairro";
            textoBairro.className = "smaller";
            
            var bairro = document.createElement("p");
            bairro.textContent = item.idBairroNavigation.nomeBairro;
            bairro.className = "valor";
            divBairro.appendChild(textoBairro);
            divBairro.appendChild(bairro);

            var link = document.createElement("a");
            link.href = gerarUrl(item);
            link.textContent = "Ver serviços";

            box.appendChild(titulo);
            box.appendChild(divEndereco);
            box.appendChild(divBairro);
            box.appendChild(link);

            section.appendChild(box);

        } catch (error) {
            console.log(error)
        }
    })
}

gerarUrl = (local) =>{
    var url = "local.html?idLocal=" + local.idLocal;
    return url;
}


// filtroBairro.addEventListener("change",() => {
//     event.preventDefault();
//     limparExibidos();

//     var filtro = locaisExibidos.filter(item => item.idBairro == event.target.value);
//     console.log(filtro);
//     preencherConteudo(filtro);
// })

// filtroTipo.addEventListener("change",() =>{
//     event.preventDefault();
//     limparExibidos();


//     var filtro = locaisExibidos.filter(item => item.idTipoLocal == event.target.value);
//     console.log(filtro);
//     preencherConteudo(filtro);

// })

// function carregarTipos(){
//     var url = "http://localhost:5000/api/tiposlocais";
//     fetch(url)
//     .then(response => response.json())
//     .then(data => preencherTiposDeLocais(data))
//     .catch(error => console.log(error))
// }

// function carregarBairros(){
//     var url = "http://localhost:5000/api/bairros";
//     fetch(url)
//     .then(response => response.json())
//     .then(data => preencherBairros(data))
//     .catch(error => console.log(error))
// }

// preencherTiposDeLocais = (tipos) =>{
//     console.log(tipos)
//     tipos.forEach(item =>{
//         var option = document.createElement("option");
//         option.value = item.idTipoLocal;
//         option.label = item.nomeTipolocal;

//         filtroTipo.appendChild(option);
//     })
// }

// preencherBairros = (bairros) =>{
//     bairros.forEach(item =>{
//         var option = document.createElement("option");
//         option.value = item.idBairro;
//         option.label = item.nomeBairro;

//         filtroBairro.appendChild(option);
//     })
// }

// function limparExibidos(){
//     for (let i = 0; i < divsExibidas.length; i++) {
//         const element = divsExibidas[i];
//         element.remove();
//         return;
//     }
// }