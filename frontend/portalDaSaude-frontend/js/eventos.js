

$(".btn_dropdown").click(function(){
    console.log("aoba");
    // mostra/ esconde a lista de locais e a descricao
    $(this).parent().children("ul").slideToggle();
    $(this).parent().children(".event_description").slideToggle();

    //vira a setinha pra cima/pra baixo
    $(this).children("span").children("img").toggleClass("turned")

})