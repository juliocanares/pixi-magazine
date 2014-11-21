/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page5 = function () {
    APP.BasePage.call(this, 'page5');
};

APP.Page5.constructor = APP.Page5;
APP.Page5.prototype = Object.create(APP.BasePage.prototype);

APP.Page5.prototype.start = function () {
    this.buildView();
};

APP.Page5.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);

    this.title = Util.createSpriteFromImage(this.getAsset("title.png"), 'title', false, null);
    this.title.width = 255;
    this.title.height = 86;
    this.title.position = {x: -200, y: 520};
    this.title.alpha = 0;
    this.addChild(this.title);

    this.playBindHandler = this.playHandler.bind(this);
    this.play = Util.createSpriteFromImage(this.getAsset("play-blue.png", "ui"), 'play', true, this.playBindHandler);
    this.play.position = {x: -100, y: 615};
    this.play.alpha = 0;
    this.addChild(this.play);

    this.plusBindHandler = this.plusHandler.bind(this);
    this.plus = Util.createSpriteFromImage(this.getAsset("plus-blue.png", "ui"), 'plus', true, this.plusBindHandler);
    this.plus.position = {x: -100, y: 615};
    this.plus.alpha = 0;
    this.addChild(this.plus);

    this.box = Util.createSpriteFromImage(this.getAsset("box.png"), 'box', false, null);
    this.box.width = 517
    this.box.height = 453;
    this.box.position = {x: 440, y: 140};
    this.addChild(this.box);

    this.minusBindHandler = this.minusHandler.bind(this);
    this.minus = Util.createSpriteFromImage(this.getAsset("minus-blue.png", "ui"), 'minus', true, this.minusBindHandler);
    this.minus.width = this.minus.height = 63;
    this.minus.position = {x: 635, y: 590};
    TweenMax.to(this.minus, 1, {alpha: 0, repeat: -1, yoyo: true});
    this.box.addChild(this.minus);

    this.box.alpha = 0;

    this.animIn();
};
