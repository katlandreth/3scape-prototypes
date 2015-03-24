$(document).ready(function(){
    var canvas = document.getElementById('canvas1');
                var context = canvas.getContext("2d");
                canvas.width  = window.innerWidth;
                canvas.height = window.innerHeight;
    
    var contextMenu = '<nav class="circular-menu">'+
                       '<div class="circle">'+
                        '<ul class="circle-menu">'+
                        '<li><span class="fa-refresh fa"></span><button class="spnlt fa-angle-left fa"></button><button class="spnrt fa-angle-right fa"></button></li>'+
                '<li><span class="fa-signal fa"></span><input id="slider" class="scale" type=range id=scale min=1 value=1 max=100 step=1 "></li>'+
                '<li class="fa-tint fa"><input type="color"></li>'+
                '<li><span class="cow"></span><input type="radio" name="motion" value="on"><input type="radio" name="motion" value="off"></li>'+
                '<li><span class="fa-reply fa pointup"></span><button class="spnup fa-angle-up fa"></button><button class="spndwn fa-angle-down fa"></li>'+
                '</div>'+
                '<li class="menu-button fa-arrows-alt fa"></li>'+
            '</ul>'+
        '</nav>';
    
    //Setup the first modal
    var first = $(".modal");
    $(first).addClass("first");
    $(this).find(".modal-head").text("Welcome to 3Scape!");
    $(this).find(".modal-content").text("Let's start building things. Click anywhere on the Texture Plane");
    $(this).find("button.next").css("display", "none");

    //Place Click Target, and place next modal
    $('canvas').click(function(e) {
         var target = $( e.target );
         if ( target.is('body') || target.is('html') || target.is('canvas') ) {
               // $(".crosshair").remove();
                var offset = $(this).offset();
                var offX= e.clientX - offset.left - 12;
                var offY= e.clientY - offset.top -12 ;
                var modalLeft= offX -130;
                var modalTop= offY +170;
                context.clearRect ( 0 , 0 , canvas.width, canvas.height );
                var img = new Image();
                img.src = "../img/target.png";
                img.onload = function() {
                    context.drawImage(img,offX,offY,50,50);
                };
                
//                var div = document.createElement('div');
//                var canvas = document.body.appendChild(makecanvas); 
//                var crosshair = canvas.appendChild(div);
//                var newContent = document.createTextNode("\u2316"); 
//                crosshair.appendChild(newContent); 
//                $('div:contains("\u2316")').addClass('crosshair');
//                $('.crosshair').css({"top": offY + 'px', "left": offX + 'px', "cursor": "default"});
                $(".modal").removeClass("first").addClass("second").animate({top: modalTop + "px", left: modalLeft + "px"});
                $(".modal-head").text("Your Very First Target");
                $(".modal-content").text("Now, choose a shape from the toolbar to drop it on the target.");
           }
    });
    
    
    //Place clicked shape, report that shape in the next modal, give it a context menu
    $(".tool").click(function(){
        
        var offset = $(".modal").offset();
        var offX = offset.left +100;
        var offY = offset.top -250 ;
        var canvasX = offset.left +210;
        var canvasY = offset.top -460;
        var classList = $(this).attr('class').split(/\s+/);
        var shapeName = classList.pop();
        var shapeClass= "." + shapeName ;
        var imgSrc = window.getComputedStyle(
	       document.querySelector(shapeClass), ':before'
            ).getPropertyValue('background-image');
        var img = new Image();
        context.clearRect ( 0 , 0 , canvas.width, canvas.height );
        imgSrc = /^url\((['"]?)(.*)\1\)$/.exec(imgSrc);
        imgSrc = imgSrc ? imgSrc[2] : ""; 
        img.src = imgSrc;
        img.onload = function(){
            context.drawImage(img,offX,offY,100,100);
        }
        
//        $(".crosshair").addClass("btn trigger").css({"top":offY + "px","left":offX + "px"});
        $("nav.circular-menu").remove();
        $("body").append(contextMenu);
        $('#slider').on('change', function(){
            var value = $('#slider').val();
            var valueInt = parseInt(value, 10);
            var shapeStart = parseInt($(".crosshair").css('background-size'), 10);
            var shapeSize = shapeStart + valueInt;

            //$(".crosshair").animate({"background-size": shapeSize + "px", "width": shapeSize + "px", "height": shapeSize +"px"});
        });
    
        
        if ($(this).hasClass("cube")){
            $(".crosshair").addClass("cubeShape");
        }
        if ($(this).hasClass("sphere")){
            $(".crosshair").addClass("sphereShape");
        }
        if ($(this).hasClass("tube")){
            $(".crosshair").addClass("tubeShape");
        }
        if ($(this).hasClass("elbow")){
            $(".crosshair").addClass("elbowShape");
        }
        if ($(this).hasClass("pyramid")){
            $(".crosshair").addClass("pyramidShape");
        }
        if ($(this).hasClass("wedge")){
            $(".crosshair").addClass("wedgeShape");
        }
        if ($(this).hasClass("wall")){
            $(".crosshair").addClass("wallShape");
        }
        if ($(this).hasClass("gear")){
            $(".crosshair").addClass("gearShape");
        }
        if ($(this).hasClass("plank")){
            $(".crosshair").addClass("plankShape");
        }
        if ($(this).hasClass("beam")){
            $(".crosshair").addClass("beamShape");
        }
        if ($(this).hasClass("ring")){
            $(".crosshair").addClass("ringShape");
        }
        
        $(".modal").removeClass().addClass("modal third");
        $(".modal-head").text("Hey, that's a " + shapeName);
        $(".modal-content").text("Let's make this " + shapeName + " a lot bigger. Right-click on the " + shapeName + ".");
        var items = $('.circle li');
        for (var i = 0, l = items.length; i < l; i++) {
          items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
          items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }
        
        $(".menu-button").css({"top": canvasY + "px", "left": canvasX +"px"});
        document.querySelector('.menu-button').oncontextmenu = function(e) {
         e.preventDefault(); 
         document.querySelector('.circle').classList.toggle('open');
             console.log("true!");
//                var offset = $(".modal").offset();
                var contextModalX = offset.left +400;
                var contextModalY = offset.top +100;
                $(".modal").addClass("pointRight").animate({"top": contextModalY + "px", "left": contextModalX + "px"});
                $(".modal-head").text("This is where you change shapes");
                $(".modal-content").text("Drag the scale slider to the right to make this " + shapeName + " bigger." );
         }
        
        $(".spnlt").click(function(){
        console.log("click left");
            if (!$(".fa-refresh").hasClass("fa-flip-horizontal")){
             console.log("doesn't have it");
            $(".fa-refresh").addClass("fa-flip-horizontal");
             console.log("it's added");
            }
        });
        $(".spnrt").click(function(){
        console.log("click right");
        $(".fa-refresh").removeClass("fa-flip-horizontal");
        });
        $(".spnup").click(function(){
        console.log("click up");
            if (!$(".fa-reply").hasClass("pointup")){
             console.log("doesn't have vertical");
            $(".fa-reply").removeClass("pointdown").addClass("pointup");
             console.log("vertical added");
            }
        });
        $(".spndwn").click(function(){
        console.log("click down");
        $(".fa-reply").removeClass("pointup").addClass("pointdown");
        });
        
    });
    
   

    
    
    //Quit Button in Every Modal
    $(".quit").click(function(){
      var quit = $(".modal").removeClass().addClass("modal quit-modal");
        $(".modal-head").text("See You Later");
        $(".modal-content").text("You can always come back to this tour, or get more help using 3SCape by clicking the Help button              in the Menu Dropdown");
        $("button.quit").css("display", "none");
        $("button.next").addClass("hide").css("display", "block").text("OK");
        $(".hide").click(function(){
            $(".modal").css("display", "none");
        });
    });
     
    
    //Menu Stuff
     $('.fa-reorder').click(function(){
         $('.flyout').slideToggle(250);
         $('.menutip').addClass('whiten-text');
    });
    $('.fa-remove-sign').click(function(){
        $('html').css('background-image', 'url(./clearedbackground.png)'); 
        $('.warning').show(1000);
    });
    $('.undo').click(function(){
        $('html').css('background-image', 'url(./3scapebackground3.png)'); 
        $('.warning').hide(100);
    });
    $('.fa-remove').click(function(){
        $('.warning').hide(200);
    });
    
});
