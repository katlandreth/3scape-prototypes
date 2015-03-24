//Library to convert hex to RGB and back    
function hexToRgb(e,t){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);var r=function(){if(this.alpha==undefined){return"rgb("+this.r+", "+this.g+", "+this.b+")"}if(this.alpha>1){this.alpha=1}else if(this.alpha<0){this.alpha=0}return"rgb("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")"};if(t==undefined){return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),toString:r}:null}if(t>1){t=1}else if(t<0){t=0}return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),alpha:t,toString:r}:null}function rgbToHex(e,t,n){function s(e){var t=e.toString(16);return t.length==1?"0"+t:t}if(t==undefined||n==undefined){if(typeof e=="string"){var r=/^rgb[a]?\(([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,?[ \n]*([.\d]+)?[ \n]*\)$/i.exec(e);return rgbToHex(parseInt(r[1]),parseInt(r[2]),parseInt(r[3]))}if(e.r==undefined||e.g==undefined||e.b==undefined){return null}return rgbToHex(e.r,e.g,e.b)}var i=e;return"#"+s(i)+s(t)+s(n)}  


//library to convert rgb to hsl and back    
function rgbToHsl(r, g, b) {
r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return ({
        h: h,
        s: s,
        l: l,
    });
}

function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return ({
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    });
}
