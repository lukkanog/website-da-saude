const section =  document.querySelector("#locais_cadastrados");
const loading = document.querySelector("#loading");

$(".btn_dropdown").click(function(){
    console.log("aoba");
    // mostra/ esconde a lista de locais e a descricao
    $(this).parent().children(".dropdown_content").slideToggle();
    // $(this).parent().children(".description").slideToggle();

    //vira a setinha pra cima/pra baixo
    $(this).children("span").children("img").toggleClass("turned");
})
