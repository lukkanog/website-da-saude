const section = document.querySelector("#areas");
const loading = document.querySelector("#loading");

var areasExibidas  = [];

carregarAreas();


async function carregarAreas(){
    var url = "http://lukkanog-001-site1.ftempurl.com/api/categorias/servicos";
    fetch(url)
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


 preencherConteudo = (areas) =>{
     if (areas !== null && areas.length >= 1){
        console.table(areas)
        areas.forEach(item => {
            ({servicos, nomeCategoria} = item);

            var box = document.createElement("div");
            box.className = "dropdown";

            var botao = document.createElement("div");
            botao.className = "btn_dropdown";
            botao.setAttribute("role", "button");
            botao.setAttribute("aria-label", "expandir categoria para mais informações");
            botao.setAttribute("aria-haspopup", "true");
            botao.setAttribute("aria-expanded", "false");

            var textos = document.createElement("div");
            var titulo = document.createElement("h3");
            titulo.textContent = nomeCategoria;

            textos.appendChild(titulo);
            botao.appendChild(textos);

            var seta = document.createElement("div");
            seta.className = "ver_mais";

            var verMais = document.createElement("p");
            verMais.textContent = "Ver serviços";
            

            var iconeSeta = document.createElement("img");
            iconeSeta.src = "../assets/img/arrow-icon.png.png";
            iconeSeta.alt = "";
            seta.append(verMais, iconeSeta);
            box.appendChild(botao);
            botao.appendChild(seta);

            //#region lista de servicos de cada categoria
            var lista = document.createElement("ul");
            lista.className = "dropdown-menu";
    
            var header = document.createElement("li");
            header.className = "dropdown-header";
            header.textContent = "Serviços";
            lista.appendChild(header);

            servicos.forEach(item =>{
                ({nomeServico} = item);

                var li = document.createElement("li");
                li.className = "dropdown-item";

                var link = document.createElement("a");
                link.href = gerarUrl(item);
                link.textContent = nomeServico;

                li.appendChild(link);
                lista.appendChild(li);
            })
            box.appendChild(lista);
            //#endregion

            $(botao).click(function(){

                // mostra/ esconde a lista de locais e a descricao
                $(this).parent().children("ul").slideToggle();
            
                //vira a setinha pra cima/pra baixo
                $(this).children(".ver_mais").children("img").toggleClass("turned");
            })

            section.appendChild(box)
        });

     }else{
        exibirNaoEncontrado();
     }
 }


$(".btn_dropdown").click(function(){
    // mostra/ esconde a lista de locais e a descricao
    $(this).parent().children("ul").slideToggle();

    //vira a setinha pra cima/pra baixo
    $(this).children("span").children("img").toggleClass("turned");
})

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

gerarUrl = (servico) =>{
    var url = "servico.html?idServico=" + servico.idServico;
    return url;
}