Util = function () {
};

Util.removeAllChildrens = function (f, d) {
    for (var c = f.children.length - 1; c >= 0; c--) {
        var a = true;
        if (d != null) {
            for (var b = 0; b < d.length; b++) {
                if (f.getChildAt(c) == d[b]) {
                    a = false
                }
            }
        }
        if (a) {
            var e = f.getChildAt(c);
            f.removeChild(e);
            e = null
        }
    }
};

Util.floatRand = function (b, a) {
    if (isNaN(a)) {
        a = b;
        b = 0
    }
    return Math.random() * (a - b) + b
};

Util.randomRange = function (b, a) {
    if (isNaN(a)) {
        a = b;
        b = 0
    }
    return Math.floor(Util.floatRand(b, a))
};


Util.createSprite = function (c, b, a, e) {
    var d = new PIXI.Sprite(PIXI.Texture.fromFrame(c));
    d.name = b;
    if (a) {
        d.setInteractive(true);
        d.buttonMode = true;
        if (e != null) {
            d.click = d.tap = e;
        }
    }
    return d
};

Util.createSpriteFromImage = function (c, b, a, e) {
    var d = new PIXI.Sprite(PIXI.Texture.fromImage(c));
    d.name = b;
    if (a) {
        d.setInteractive(true);
        d.buttonMode = true;
        if (e != null) {
            d.click = d.tap = e;
        }
    }
    return d
};
