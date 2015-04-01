$(document).ready(function(){
    var ew = $('.innerdial, .meter-outer, #meter-inner').css("width");
    var fontSize = parseInt(ew)/2;
    $('.innerdial, .meter-outer, #meter-inner').css({'height':ew});
    $('span.fa').css({'line-height':ew, 'font-size': fontSize});
    $( window ).bind("resize", function(){
        var ew = $('.innerdial, .meter-outer, #meter-inner').css("width");
        var fontSize = ew ;
        var fontSize = parseInt(ew)/2;
        $('.innerdial, .meter-outer, #meter-inner').css({'height':ew});
        $('span.fa').css({'line-height':ew, 'font-size': fontSize});
    });
});