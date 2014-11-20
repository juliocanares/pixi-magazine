/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page3 = function () {
    APP.BasePage.call(this, 'page3');
};

APP.Page3.constructor = APP.Page3;
APP.Page3.prototype = Object.create(APP.BasePage.prototype);

APP.Page3.prototype.start = function () {
    this.buildView();
};

APP.Page3.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);


    this.title = Util.createSpriteFromImage(this.getAsset("title.png"), 'title', false, null);
    this.title.width = 349;
    this.title.height = 191;
    this.title.alpha = 0;
    this.title.position = {x: -200, y: 195};
    this.addChild(this.title);

    this.plusBindHandler = this.plusHandler.bind(this);
    this.plus = Util.createSpriteFromImage(this.getAsset("plus-blue.png", "ui"), 'plus', true, this.plusBindHandler);
    this.plus.position = {x: -100, y: 390};
    this.plus.alpha = 0;
    this.addChild(this.plus);


    this.box = Util.createSpriteFromImage(this.getAsset("box.png"), 'box', false, null);
    this.box.width = 420;
    this.box.height = 363;
    this.box.position = {x: 560, y: 370};
    this.addChild(this.box);

    this.minusBindHandler = this.minusHandler.bind(this);
    this.minus = Util.createSpriteFromImage(this.getAsset("minus-blue.png", "ui"), 'minus', true, this.minusBindHandler);
    this.minus.width = this.minus.height = 63;
    this.minus.position = {x: 370, y: 450};
    TweenMax.to(this.minus, 1, {alpha: 0, repeat: -1, yoyo: true});
    this.box.addChild(this.minus);

    this.box.alpha = 0;

    this.animIn();
};

APP.Page3.prototype.animIn = function () {
    TweenMax.to(this.title.position, .5, {x: 50, ease: Cubic.easeInOut});
    TweenMax.to(this.title, .5, {alpha: 1, ease: Cubic.easeInOut});


    TweenMax.to(this.plus.position, .5, {delay: .3, x: 210, ease: Cubic.easeInOut});
    TweenMax.to(this.plus, .5, {delay: .3, alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
        TweenMax.to(this.plus, 1, {alpha: 0, repeat: -1, yoyo: true});
    }, this)});

};

APP.Page3.prototype.plusHandler = function () {
    if (this.box.alpha == 0)
        TweenMax.to(this.box, .5, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page3.prototype.minusHandler = function () {
    TweenMax.to(this.box, .5, {alpha: 0, ease: Cubic.easeInOut});
};

APP.Page3.prototype.restart = function () {

};


APP.Page3.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};