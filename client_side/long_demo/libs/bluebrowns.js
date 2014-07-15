browns = function(a) {
    var b, g, r;
    if (a == null) {
        a = 0.8;
    }
    r = Math.floor(Math.random() * 100) + 100;
    g = (Math.floor(Math.random() * 3) + 2) * 25;
    b = 49;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};
reds = function(a) {
    var b, g, r;
    if (a == null) {
        a = 0.8;
    }
    r = Math.floor(Math.random() * 100) + 100;
    g = 44;
    b = 49;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};
blues = function(a) {
    var b, g, r;
    if (a == null) {
        a = 0.8;
    }
    r = Math.floor(Math.random() * 50) + 30;
    g = Math.floor(Math.random() * 30) + 100;
    b = 180;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};
bluebrowns = function(a) {
    if (a == null) {
        a = 0.8;
    }
    if (Math.round(Math.random())) {
        return blues(a);
    } else {
        return browns(a);
    }
};