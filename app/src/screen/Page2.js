/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page2 = function () {
    APP.BasePage.call(this, 'page2');
};

APP.Page2.constructor = APP.Page2;
APP.Page2.prototype = Object.create(APP.BasePage.prototype);

APP.Page2.prototype.start = function () {
    this.buildView();
};

APP.Page2.prototype.buildView = function () {

    this.image01 = Util.createSpriteFromImage(this.getAsset("angelo-cano-01.jpg"), 'angelo_cano_01', false, null);
    this.addChild(this.image01);

    this.image02 = Util.createSpriteFromImage(this.getAsset("angelo-cano-02.jpg"), 'angelo_cano_02', false, null);
    this.addChild(this.image02);

    this.image03 = Util.createSpriteFromImage(this.getAsset("angelo-cano-03.jpg"), 'angelo_cano_03', false, null);
    this.addChild(this.image03);

    this.image01.alpha = this.image02.alpha = this.image03.alpha = 0;

    this.instagramBindHandler = this.instagramHandler.bind(this);
    this.instagram = Util.createSpriteFromImage(this.getAsset("instagram-link.jpg", "ui"), 'instagram', true, this.instagramBindHandler);
    this.addChild(this.instagram);

    this.facebookBindHandler = this.facebookHandler.bind(this);
    this.facebook = Util.createSpriteFromImage(this.getAsset("facebook-link.jpg", "ui"), 'facebook', true, this.facebookBindHandler);
    this.addChild(this.facebook);

    this.playBindHandler = this.playHandler.bind(this);
    this.play = Util.createSpriteFromImage(this.getAsset("play-blue.png", "ui"), 'play', true, this.playBindHandler);

    this.addChild(this.play);

    this.instagram.alpha = this.facebook.alpha = this.play.alpha = 0;

    this.instagram.position = {x: 60, y: 625 };
    this.facebook.position = {x: 25, y: 625 };
    this.play.position = {x: 490, y: 360 };

    this.animIn();
};

APP.Page2.prototype.animIn = function () {
    this.imageFadeInOut(this.image01, $.proxy(function () {
        this.imageFadeInOut(this.image02, $.proxy(function () {
            TweenMax.to(this.image03, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
                this.animationLinks();
            }, this)});
        }, this));
    }, this));
};

APP.Page2.prototype.imageFadeInOut = function (target, complete) {
    TweenMax.to(target, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: function () {
        TweenMax.to(target, 1, {delay: 2, alpha: 0, ease: Cubic.easeOut, onComplete: complete})
    }});
};

APP.Page2.prototype.animationLinks = function () {
    TweenMax.to(this.instagram, 1, {delay: .5, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.facebook, 1, {alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.play, 1, {delay: 1.5, alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
        TweenMax.to(this.play, 1, {alpha: 0, repeat: -1, yoyo: true});
    }, this)});
};

APP.Page2.prototype.instagramHandler = function () {
    window.open('http://instagram.com/dcshoes_peru', "_blank")
};

APP.Page2.prototype.facebookHandler = function () {
    window.open('https://www.facebook.com/DCShoesPeru?fref=ts', "_blank")
};

APP.Page2.prototype.playHandler = function () {
    $(".swipebox-page2").trigger("click");
};

APP.Page2.prototype.restart = function () {

};


APP.Page2.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};