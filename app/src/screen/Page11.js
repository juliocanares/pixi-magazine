/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page11 = function () {
    APP.BasePage.call(this, 'page11');
};

APP.Page11.constructor = APP.Page11;
APP.Page11.prototype = Object.create(APP.BasePage.prototype);

APP.Page11.prototype.start = function () {

    this.currentSelector = null;
    this.oldSelector = null;

    this.buildView();
};

APP.Page11.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;

    this.addChild(this.background);

    this.logo = Util.createSpriteFromImage(this.getAsset("logo.png"), 'logo', false, null);
    this.logo.width = 483;
    this.logo.height = 206;
    this.logo.position = {x: stageW + 200, y: 20};
    this.logo.alpha = 0;
    this.addChild(this.logo);

    this.positionData = [
        {x1: 915, y1: 200, box: "box1", x2: 630, y2: 210, w2: 348, h2: 476},
        {x1: 325, y1: 570, box: "box2", x2: 90, y2: 275, w2: 345, h2: 307}
    ];

    this.selectorBindHandler = this.selectorHandler.bind(this);

    for (var i = 0; i < this.positionData.length; i++) {
        var posData = this.positionData[i];
        this.selector = Util.createSpriteFromImage(this.getAsset("selector-red.png", "ui"), i.toString(), true, this.selectorBindHandler);
        this.selector.position.x = posData.x1;
        this.selector.position.y = posData.y1;
        this.addChild(this.selector);

        this.box = Util.createSpriteFromImage(this.getAsset(posData.box + ".png"), posData.box, false, null);
        this.box.width = posData.w2;
        this.box.height = posData.h2;
        this.box.position.x = posData.x2;
        this.box.position.y = posData.y2;
        this.addChild(this.box);
        this.box.alpha = 0;

        this.selector.box = this.box;

        TweenMax.from(this.selector, .5, {delay: i * .5, alpha: 0, ease: Cubic.easeInOut});
    }

    this.animIn();
};

APP.Page11.prototype.animIn = function () {
    TweenMax.to(this.logo.position, 1, {x: 135, ease: Cubic.easeInOut});
    TweenMax.to(this.logo, 1, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page11.prototype.selectorHandler = function (e) {
    this.currentSelector = e.target.box;

    if (this.oldSelector != null && this.oldSelector != this.currentSelector)
        TweenMax.to(this.oldSelector, .5, {alpha: 0});
    if (this.currentSelector.alpha == 0)
        TweenMax.to(this.currentSelector, .5, {delay: .4, alpha: 1})

    this.oldSelector = this.currentSelector;
};

APP.Page11.prototype.showBox = function () {

};


APP.Page11.prototype.hideBox = function () {

};

APP.Page11.prototype.plusHandler = function () {
    if (this.box.alpha == 0)
        TweenMax.to(this.box, .5, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page11.prototype.minusHandler = function () {
    TweenMax.to(this.box, .5, {alpha: 0, ease: Cubic.easeInOut});
};

APP.Page11.prototype.restart = function () {

};


APP.Page11.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};