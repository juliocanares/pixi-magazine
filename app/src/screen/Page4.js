/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page4 = function () {
    APP.BasePage.call(this, 'page4');
};

APP.Page4.constructor = APP.Page4;
APP.Page4.prototype = Object.create(APP.BasePage.prototype);

APP.Page4.prototype.start = function () {
    this.buildView();
};

APP.Page4.prototype.buildView = function () {

    this.image01 = Util.createSpriteFromImage(this.getAsset("image01.jpg"), 'image_01', false, null);
    this.addChild(this.image01);

    this.image02 = Util.createSpriteFromImage(this.getAsset("image02.jpg"), 'image_02', false, null);
    this.addChild(this.image02);

    this.image03 = Util.createSpriteFromImage(this.getAsset("image03.jpg"), 'image_03', false, null);
    this.addChild(this.image03);

    this.image04 = Util.createSpriteFromImage(this.getAsset("image04.png"), 'image_04', false, null);
    this.addChild(this.image04);
    this.image04.position.y = stageH + this.image04.height;

    this.image05 = Util.createSpriteFromImage(this.getAsset("image05.png"), 'image_05', false, null);
    this.image05.width = 225;
    this.image05.height = 280;
    this.image05.position.y = stageHBase - (this.image05.height + 40);
    this.addChild(this.image05);

    this.image06 = Util.createSpriteFromImage(this.getAsset("image06.png"), 'image_06', false, null);
    this.image06.width = 287;
    this.image06.height = 310;
    this.image06.position.x = stageWBase - this.image06.width;
    this.image06.position.y = stageHBase - (this.image06.height + 40);
    this.addChild(this.image06);


    this.image01.width = this.image02.width = this.image03.width = this.image04.width = 1024;
    this.image01.height = this.image02.height = this.image03.height = 768;

    this.image04.height = 263;

    this.image01.alpha = this.image02.alpha = this.image03.alpha = this.image04.alpha = this.image05.alpha = this.image06.alpha = 0;

    this.animIn();
};

APP.Page4.prototype.animIn = function () {
    this.imageFadeInOut(this.image01, $.proxy(function () {
        this.imageFadeInOut(this.image02, $.proxy(function () {
            TweenMax.to(this.image03, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
                TweenMax.to(this.image03.position, 1, {delay: 1, y: "-=100", ease: Cubic.easeInOut});
                TweenMax.to(this.image04, 1, {delay: 1, alpha: 1});
                TweenMax.to(this.image04.position, 1, {delay: 1, y: stageHBase - (this.image04.height + 40), ease: Cubic.easeInOut});
                TweenMax.to(this.image05, 1, {delay: 1.3, alpha: 1});
                TweenMax.to(this.image06, 1, {delay: 1.3, alpha: 1});
            }, this)});
        }, this));
    }, this));
};

APP.Page4.prototype.imageFadeInOut = function (target, complete) {
    TweenMax.to(target, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: function () {
        TweenMax.to(target, 1, {delay: 2, alpha: 0, ease: Cubic.easeOut, onComplete: complete})
    }});
};


APP.Page4.prototype.restart = function () {

};

APP.Page4.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};