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

Util.centerToContainer = function (target, bound) {
    target.position.x = bound.width * .5 - target.width * .5;
    target.position.y = bound.height * .5 - target.height * .5;
};

Util.intersects = function (object1, object2) {
    var isCollision = false;
    if (object1.position.x < object2.position.x + object2.width && object1.position.x + object1.width > object2.position.x &&
        object1.position.y < object2.position.y + object2.height && object1.position.y + object1.height > object2.position.y + 35) {
        isCollision = true;
    }
    return isCollision;
};

Util.createText = function (b, a) {
    var c = new PIXI.Text(b, a);
    c.anchor.x = c.anchor.y = 0.5;
    return c
};

Util.removeThis = function (obj) {
    if (obj && obj.parent) {
        obj.parent.removeChild(obj);
        obj = null;
    }
};


Util.canFullScreeen = function () {
    return document.body.mozRequestFullScreen || document.body.webkitRequestFullScreen || document.body.webkitRequestFullScreen;
};

Util.iOSversion = function () {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return[parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3] || 0, 10)]
    }
};

Util.getInternetExplorerVersion = function () {
    var a = -1;
    if ("Microsoft Internet Explorer" == navigator.appName) {
        var b = navigator.userAgent, c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        null != c.exec(b) && (a = parseFloat(RegExp.$1))
    } else if ("Netscape" == navigator.appName) {
        var b = navigator.userAgent, c = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
        null != c.exec(b) && (a = parseFloat(RegExp.$1))
    }
    return a
};