$(document).ready(function(){
    //Quit Button in Every Modal
    $(".quit").click(function(){
        var modal = $(".modal");
        var flyout = $(".flyout");
        var modalHead = $(".modal-head");
        var modalContent = $(".modal-content");
        var quit = modal.removeClass().addClass("modal quit-modal pointLeft");
        $("div.modalTable").hide();
        modalContent.show();
        modal.css({"height":"auto", "z-index":"1000"});
        flyout.slideToggle(250);
        modal.animate({top: 120, left: 200});
        modalHead.text("See You Later");
        modalContent.text("You can always come back to this tour or get more help using 3SCape by clicking the Help button                   in the Menu Dropdown");
        $("button.quit").css("display", "none");
        $("button.next").removeClass("next").addClass("hide").css("display", "block").text("OK");
        $(".hide").click(function(){
            modal.css("display", "none");
            flyout.slideUp(250);
        });
    });
});
