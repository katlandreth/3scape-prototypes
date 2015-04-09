window.onload = function(){
     
     var cw = Raphael.colorwheel($(".colorwheel")[0], color_wheel_size, 15);
    console.log(cw);
    cw.onchange(function getColor(color){
        var rawColor = cw.color(),
            rColor = Math.round(rawColor.r),
            gColor = Math.round(rawColor.g),
            bColor = Math.round(rawColor.b),
            thisColor = rColor + ", " + gColor + ", " + bColor; 
        console.log("rgb(" + thisColor + ")");
    });
}
                 