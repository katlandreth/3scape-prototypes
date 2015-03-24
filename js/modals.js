$(document).ready(function(){
    var next= $("button.next");
    var prev= $("button.previous");
    var first=$(".first");
    var last=$(".last");
    var modal=$(".modal");
    var dur = 600;
    modal.hide();
    first.show();
    next.click(function(){
        console.log("start function");
        var thisModal = $(".modal:visible");
        console.log(thisModal);
        thisModal.hide(dur);
        thisModal.next(modal).addClass("active").show(dur);
        if (thisModal.hasClass("last")){
            modal.hide(dur);
            first.show(dur);
        }
        if($(".modal.highfive").hasClass("active")){
        console.log("highfive visible");
        $(".highfive .modal-content").html("<p>Hey, I just realized I <i>can</i> high five you!</p><iframe src='https://go.3scape.me/highfive' frameborder='0'></iframe>");
    }
    });
    prev.click(function(){
        console.log("start function");
        var thisModal = $(".modal:visible");
        console.log(thisModal);
        thisModal.hide(dur);
        thisModal.prev(modal).show(dur);
        if (thisModal.hasClass("first")){
            modal.hide(dur);
            last.show(dur);
        }
    });
    
});