/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page8 = function () {
    APP.BasePage.call(this, 'page8');
};

APP.Page8.constructor = APP.Page8;
APP.Page8.prototype = Object.create(APP.BasePage.prototype);

APP.Page8.prototype.start = function () {
    this.buildView();
};

APP.Page8.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("image01.jpg"), 'image_01', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);

    this.image02 = Util.createSpriteFromImage(this.getAsset("image02.png"), 'image_02', false, null);
    this.image02.width = 98;
    this.image02.height = 98;
    this.image02.position = {x: 250, y: 250};

    this.image03 = Util.createSpriteFromImage(this.getAsset("image03.png"), 'image_03', false, null);
    this.image03.width = 201;
    this.image03.height = 201;
    this.image03.position = {x: 198, y: 200};

    this.image04 = Util.createSpriteFromImage(this.getAsset("image04.png"), 'image_04', false, null);
    this.image04.width = 306;
    this.image04.height = 306;
    this.image04.position = {x: 145, y: 148};

    this.image05 = Util.createSpriteFromImage(this.getAsset("image05.png"), 'image_05', false, null);
    this.image05.width = 410;
    this.image05.height = 410;
    this.image05.position = {x: 94, y: 97};

    this.image06 = Util.createSpriteFromImage(this.getAsset("image06.png"), 'image_06', false, null);
    this.image06.width = 515;
    this.image06.height = 515;
    this.image06.position = {x: 40, y: 45};

    this.image02.alpha = this.image03.alpha = this.image04.alpha = this.image05.alpha = this.image06.alpha = 0;

    this.addChild(this.image06);
    this.addChild(this.image05);
    this.addChild(this.image04);
    this.addChild(this.image03);
    this.addChild(this.image02);


    this.image07 = Util.createSpriteFromImage(this.getAsset("image07.png"), 'image_07', false, null);
    this.image07.width = 505;
    this.image07.height = 362;
    this.image07.position = {x: 43, y: 118};
    this.addChild(this.image07);


    this.animIn();
};

APP.Page8.prototype.animIn = function () {

    var animation = new TimelineMax({repeat: -1});
    animation.to(this.image02, 0.1, {alpha: 1});
    animation.to(this.image03, 0.1, {delay: 0.1, alpha: 1});
    animation.to(this.image04, 0.1, {delay: 0.1, alpha: 1});
    animation.to(this.image05, 0.1, {delay: 0.1, alpha: 1});
    animation.to(this.image06, 0.1, {delay: 0.1, alpha: 1});
    animation.play();

    animation.timeScale(.8);
    /*   this.imageFadeInOut(this.image01, $.proxy(function () {
     this.imageFadeInOut(this.image02, $.proxy(function () {
     TweenMax.to(this.image03, 1, {alpha: 1 ease: Cubic.easeInOut, onComplete: $.proxy(function () {
     TweenMax.to(this.image03.position, 1, {delay: 1, y: "-=100", ease: Cubic.easeInOut});
     TweenMax.to(this.image04, 1, {delay: 1, alpha: 1});
     TweenMax.to(this.image04.position, 1, {delay: 1, y: stageH - this.image04.height + 15, ease: Cubic.easeInOut});
     TweenMax.to(this.image05, 1, {delay: 1.3, alpha: 1});
     TweenMax.to(this.image06, 1, {delay: 1.3, alpha: 1});

     }, this)});
     }, this));
     }, this));*/
};

APP.Page8.prototype.imageFadeInOut = function (target, complete) {
    TweenMax.to(target, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: function () {
        TweenMax.to(target, 1, {delay: 2, alpha: 0, ease: Cubic.easeOut, onComplete: complete})
    }});
};


APP.Page8.prototype.restart = function () {

};

APP.Page8.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};