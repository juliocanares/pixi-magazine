/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page9 = function () {
    APP.BasePage.call(this, 'page9');
};

APP.Page9.constructor = APP.Page9;
APP.Page9.prototype = Object.create(APP.BasePage.prototype);

APP.Page9.prototype.start = function () {

    this.currentSelector = null;
    this.oldSelector = null;

    this.buildView();
};

APP.Page9.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);

    this.positionData = [
        {label: "costo-avisos", x1: 175, y1: 115, w1: 62, h1: 24, x2: 195, y2: 145, box: "box1", x3: 210, y3: 160, w2: 431, h2: 271} ,
        {label: "avisos-standard", x1: 435, y1: 115, w1: 62, h1: 24, x2: 455, y2: 145, box: "box2", x3: 130, y3: 155, w2: 416, h2: 332},
        {label: "avisos-full", x1: 755, y1: 115, w1: 53, h1: 26, x2: 770, y2: 145, box: "box3", x3: 520, y3: 160, w2: 416, h2: 247},
        {label: "forma-pago", x1: 155, y1: 600, w1: 51, h1: 26, x2: 170, y2: 630, box: "box4", x3: 185, y3: 560, w2: 533, h2: 126},
        {label: "calendarios", x1: 860, y1: 600, w1: 85, h1: 12, x2: 890, y2: 630, box: "box5", x3: 440, y3: 470, w2: 470, h2: 218}
    ];

    this.selectorBindHandler = this.selectorHandler.bind(this);

    for (var i = 0; i < this.positionData.length; i++) {
        var posData = this.positionData[i];
        this.label = Util.createSpriteFromImage(this.getAsset(posData.label + '.png'), posData.label, false, null);
        this.label.width = posData.w1;
        this.label.height = posData.h1;
        this.label.position.x = posData.x1;
        this.label.position.y = posData.y1;
        this.addChild(this.label);

        this.selector = Util.createSpriteFromImage(this.getAsset("selector-blue.png", "ui"), i.toString(), true, this.selectorBindHandler);
        this.selector.position.x = posData.x2;
        this.selector.position.y = posData.y2;
        this.addChild(this.selector);

        this.box = Util.createSpriteFromImage(this.getAsset(posData.box + ".png"), posData.box, false, null);
        this.box.width = posData.w2;
        this.box.height = posData.h2;
        this.box.position.x = posData.x3;
        this.box.position.y = posData.y3;
        this.addChild(this.box);
        this.box.alpha = 0;

        this.selector.box = this.box;

        TweenMax.from(this.label, .5, {delay: i * .5, alpha: 0, ease: Cubic.easeInOut});
        TweenMax.from(this.selector, .5, {delay: i * .5, alpha: 0, ease: Cubic.easeInOut});
    }


    this.animIn();
};

APP.Page9.prototype.animIn = function () {

};

APP.Page9.prototype.selectorHandler = function (e) {
    this.currentSelector = e.target.box;

    if (this.oldSelector != null && this.oldSelector != this.currentSelector)
        TweenMax.to(this.oldSelector, .5, {alpha: 0});
    if (this.currentSelector.alpha == 0)
        TweenMax.to(this.currentSelector, .5, {delay: .4, alpha: 1})

    this.oldSelector = this.currentSelector;
};

APP.Page9.prototype.showBox = function () {

};


APP.Page9.prototype.hideBox = function () {

};

APP.Page9.prototype.plusHandler = function () {
    if (this.box.alpha == 0)
        TweenMax.to(this.box, .5, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page9.prototype.minusHandler = function () {
    TweenMax.to(this.box, .5, {alpha: 0, ease: Cubic.easeInOut});
};

APP.Page9.prototype.restart = function () {

};


APP.Page9.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};