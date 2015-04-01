$(document).ready(function(){
    var ew = $('.innerdial, .meter-outer, #meter-inner').css("width");
    console.log(ew);
    $('.innerdial, .meter-outer, #meter-inner').css({'height':ew});
    $( window ).bind("resize", function(){
        var ew = $('.innerdial, .meter-outer, #meter-inner').css("width");
        console.log(ew);
        $('.innerdial, .meter-outer, #meter-inner').css({'height':ew});
    });
});