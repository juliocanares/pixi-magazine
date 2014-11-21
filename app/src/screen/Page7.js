/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page7 = function () {
    APP.BasePage.call(this, 'page7');
};

APP.Page7.constructor = APP.Page7;
APP.Page7.prototype = Object.create(APP.BasePage.prototype);

APP.Page7.prototype.start = function () {
    this.buildView();
};

APP.Page7.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);

    this.logo = Util.createSpriteFromImage(this.getAsset("logo.png"), 'logo', false, null);
    this.logo.width = 255;
    this.logo.height = 209;
    this.logo.position = {x: stageW + 200, y: 15};
    this.logo.alpha = 0;
    this.addChild(this.logo);

    this.text = Util.createSpriteFromImage(this.getAsset("text.png"), 'text', false, null);
    this.text.width = 352;
    this.text.height = 125;
    this.text.position = {x: stageW + 200, y: 25};
    this.text.alpha = 0;
    this.addChild(this.text);

    this.plusBindHandler = this.plusHandler.bind(this);
    this.plus = Util.createSpriteFromImage(this.getAsset("plus-blue.png", "ui"), 'plus', true, this.plusBindHandler);
    this.plus.position = {x: stageW + 200, y: 180};
    this.plus.alpha = 0;
    this.addChild(this.plus);

    this.box = Util.createSpriteFromImage(this.getAsset("box.jpg"), 'box', false, null);
    this.box.width = 1024;
    this.box.height = 768;
    this.addChild(this.box);

    this.minusBindHandler = this.minusHandler.bind(this);
    this.minus = Util.createSpriteFromImage(this.getAsset("minus-blue.png", "ui"), 'minus', true, this.minusBindHandler);
    this.minus.width = this.minus.height = 63;
    this.minus.position = {x: 1300, y: 1050};
    this.box.addChild(this.minus);

    this.box.alpha = 0;

    this.animIn();
};

APP.Page7.prototype.animIn = function () {
    TweenMax.to(this.logo.position, .5, {x: 225, ease: Cubic.easeInOut});
    TweenMax.to(this.logo, .5, {alpha: 1, ease: Cubic.easeInOut});

    TweenMax.to(this.text.position, .5, {delay: .3, x: 525, ease: Cubic.easeInOut});
    TweenMax.to(this.text, .5, {delay: .3, alpha: 1, ease: Cubic.easeInOut});

    TweenMax.to(this.plus.position, .5, {delay: .6, x: 575, ease: Cubic.easeInOut});
    TweenMax.to(this.plus, .5, {delay: .6, alpha: 1, ease: Cubic.easeInOut});
};

APP.Page7.prototype.playHandler = function () {
    $(".swipebox-page7").trigger("click");
};

APP.Page7.prototype.plusHandler = function () {
    if (this.box.alpha == 0)
        TweenMax.to(this.box, .5, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page7.prototype.minusHandler = function () {
    TweenMax.to(this.box, .5, {alpha: 0, ease: Cubic.easeInOut});
};

APP.Page7.prototype.restart = function () {

};


APP.Page7.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};