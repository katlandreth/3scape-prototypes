$(document).ready(function(){
    var canvas = document.getElementById('canvas1'),
        context = canvas.getContext("2d"),
        modal = $(".modal");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //Setup the first modal
    $(modal).addClass("first");
    $(".modal-head").text("You've entered a land where much is possible");
    $(".modal-content").text("I'm Snappy - a voiceless spirit and your guide to this world. Come with me to learn the ways of 3Scape.           Click on the Texture Face and behold what follows.");
    $("button.next").css("display", "none");
    $("div.modalTable").hide();
    
    //Place Click Target, and place next modal
    $('html').click(function(e) {
        var target = $( e.target );
        if (target.is("html") || target.is("body") || target.is("canvas")){
            var offset = $(this).offset(),
                offX= e.clientX - offset.left -25,
                offY= e.clientY - offset.top -125,
                contextX = offX -150,
                contextY = offY -80,
                shapeX = offX -20,
                shapeY = offY -20,
                modalLeft= offX -130,
                modalTop= offY +170,
                secondModalLeft = shapeX -500,
                secondModalTop = shapeY +20,
                canvasX = offset.left +210,
                canvasY = offset.top -460,
                img = new Image();
                
            
            //Draw Click Target
            context.clearRect ( 0 , 0 , canvas.width, canvas.height );
            img.src = "img/target.png";
            img.onload = function() {
                context.drawImage(img,offX,offY,50,50);
            };
                  
            //Move Modal Below Target and Change Text
           
            $(".modal").removeClass("first").addClass("second").animate({top: modalTop , left: modalLeft });
            $(".modal-head").text("With targets like this, command the spawn point of every shape in the land");
            $(".modal-content").html("Click a shape in the toolbar and watch the magic unfold.");
          
            //Add Context Menu to Target Area
           
           
            $("body").append(contextMenu);
                
            //Arrange Circular Context Menu
            var items = $('.circle li'); 
            for (var i = 0, l = items.length; i < l; i++) {
                items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
                items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            }
            $(".circular-menu").css({"top": contextY + "px", "left": contextX +"px"});
            
            //Make Inputs In Context Menu Work Good

            $(".spnlt").click(function(){
                if (!$(".fa-refresh").hasClass("fa-flip-horizontal")){
                    $(".fa-refresh").addClass("fa-flip-horizontal");
                }
            });

            $(".spnrt").click(function(){
                $(".fa-refresh").removeClass("fa-flip-horizontal");
            });

            $(".spnup").click(function(){
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
            
            $(".tool").unbind().click(function(){
                //Drop Shape From Toolbox
                console.log("Tool Click Function Start");
                var classList = $(this).attr('class').split(/\s+/),
                    shapeName = classList.pop(),
                    shapeClass= "." + shapeName,
                    img = new Image(),
                    imgSrc = window.getComputedStyle(
                             document.querySelector(shapeClass), ':before'
                             ).getPropertyValue('background-image');

                imgSrc = /^url\((['"]?)(.*)\1\)$/.exec(imgSrc);
                imgSrc = imgSrc ? imgSrc[2] : ""; 
                img.src = imgSrc;
                context.clearRect ( 0 , 0 , canvas.width, canvas.height );
                console.log("Canvas Cleared");
                
                img.onload = function() {
                    var theInput = document.getElementById("colorpicker"),
                        x = shapeX + 50,
                        y = shapeY + 50,
                        pixel = context.getImageData(x, y, 1, 1),
                        data = pixel.data,
                        defaultR = data[0],
                        defaultG = data[1],
                        defaultB = data[2],                    
                        defaultHSL = rgbToHsl(defaultR, defaultG, defaultB),
                        defaultL = .4,
                        newDefaultRGB = hslToRgb(defaultHSL.h, defaultHSL.s, defaultL),
                        defaultHex = rgbToHex(newDefaultRGB.r, newDefaultRGB.g, newDefaultRGB.b);
                    
                    context.drawImage(img,shapeX,shapeY,100,100);
                    $('input[type="color"]').val(defaultHex);
                    
                    //Make the Color Picker Work Good
                    theInput.addEventListener("input", function() {
                        var theColor = theInput.value,
                            color = hexToRgb(theColor),
                            hslColor = rgbToHsl(color.r, color.g, color.b),
                            chosenHue = (hslColor.h),
                            imgData = context.getImageData(shapeX, shapeY, canvas.width, canvas.height),
                            data = imgData.data,
                            hsl = rgbToHsl(red, green, blue),
                            hue = hsl.h * 36,
                            newRgb = hslToRgb(chosenHue, hsl.s, hsl.l);
                        
                        for (var i = 0; i < data.length; i += 4) {
                            red = data[i + 0];
                            green = data[i + 1];
                            blue = data[i + 2];
                            alpha = data[i + 3];

                            if (alpha < 100) {
                                continue;
                            }
                                data[i + 0] = newRgb.r;
                                data[i + 1] = newRgb.g;
                                data[i + 2] = newRgb.b;
                                data[i + 3] = 255;
                        }
                        context.putImageData(imgData, shapeX, shapeY);
                        
                    }, false);
                    
                    //Make the Scale Slider Work Good
                    $('#slider').on('change', function(){
                        console.log("start slider function");
                        var value = $('#slider').val();
                        var valueInt = parseInt(value, 10);
                        var startSize = 100;
                        var modalHeight = $(".modal").height();
                        $(".modal").css({"height": modalHeight + "px"});
                        context.clearRect ( 0 , 0 , canvas.width, canvas.height );
                        context.drawImage(img,shapeX,shapeY,valueInt,valueInt);
        
                        console.log(modalHeight);
                        window.setTimeout(function() {
                            (function animateHeight(){
                                var newHeight = $(".modal").height() + $("div.modalTable").height() - 50;
                                $(".modal").addClass("fifth");
                                $(".modal-head").html("<span class='fa fa-key fa-3x fa-flip-horizontal'></span>You've earned a key to decode the symbols");
                                $(".modal-content").hide();  
                                $("button.next").css("display", "inline-block");
                                
                                
                                
                                $(".modal").animate({top: secondModalTop - 100 , left: secondModalLeft - 100});
                                $(".modal").animate({height: newHeight, width:400});
                                window.setTimeout(function(){
                                    $("div.modalTable").show();
                                    console.log("after animate");
                                }, 700);
                            })();
  
                        }, 500);
                        $(".next").unbind().click(function(){
                            $('.flyout').slideToggle(200);
                            window.setTimeout(function(){
                                $("table.tg").addClass("shrink");
                                $(".fauxContent").hide();
                                window.setTimeout(function(){
                                    $("div.modalTable").addClass("move");
                                    window.setTimeout(function(){
                                        console.log("add key to list");
                                        $("ul.go").append("<li class='fa fa-key' style='color:red; font-weight:bold;'>Help</li>")
                                    }, 500);
                                    window.setTimeout(function(){
                                        $('.flyout').slideToggle(300);
                                        $("table.tg").hide();
                                        $(".modal").css({"height":"auto"});
                                        $(".modal-head").html("Next Slide");
                                $(".modal-content").show().text("Next Slide Content");  
                                    }, 1500);
                                },500);
                            }, 500);
                        });
                    }); 
                    
                };
                
                //Change Modal Text After Shape Droped
                $(".modal").removeClass().addClass("modal third");
                $(".modal-head").html("<span class='fa fa-magic fa-2x'></span>Shapes appear on your target through some sort of wizardry" );
                $(".modal-content").text("This " + shapeName + " -and every shape here- has secrets hidden within. Right-click on this " +                  shapeName + " to unlock them.");
                
                //Change Modal after Context Open
                document.querySelector('.menu-button').oncontextmenu = function(e) {
                    console.log("On Context Menu Function Start");
                    e.preventDefault(); 
                    document.querySelector('.circle').classList.toggle('open');
                    $(".modal").addClass("pointRight").animate({"top": secondModalTop, "left": secondModalLeft});
                    $(".modal-head").text("Your skills are great and your power mighty");
                    $(".modal-content").html("Within these symbols lies the power to alter any shape. Drag the slider to see what's possible <i>and earn a reward<i>.");
                } 
            });
        }
    });
   
}); // end document.ready




