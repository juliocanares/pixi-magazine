/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page6 = function () {
    APP.BasePage.call(this, 'page6');
};

APP.Page6.constructor = APP.Page6;
APP.Page6.prototype = Object.create(APP.BasePage.prototype);

APP.Page6.prototype.start = function () {
    this.buildView();
};

APP.Page6.prototype.buildView = function () {

    this.background = new PIXI.Graphics();
    this.background.beginFill(0xFFFFFF);
    this.background.drawRect(0, 0, stageWBase, stageHBase);
    this.background.endFill();
    this.addChild(this.background);

    this.imagesContainer = new PIXI.DisplayObjectContainer();
    this.addChild(this.imagesContainer);

    this.animInBind = this.animIn.bind(this);

    for (var i = 0; i < 9; i++) {
        var imgName = 'image0' + (i + 1);
        var img = Util.createSpriteFromImage(this.getAsset(imgName + '.jpg'), imgName, false, null);
        img.width = 323;
        img.height = 180;
        img.position.x = (img.width + 5) * ( i % 3);
        img.position.y = (img.height + 5) * Math.floor(i / 3);
        img.alpha = 0;
        this.imagesContainer.addChild(img);
    }


    this.imagesContainer.position = {x: 25, y: 80};

    this.border = Util.createSpriteFromImage(this.getAsset("border.png"), 'border', false, null);
    this.border.position = {x: 10, y: 80};
    this.addChild(this.border);

    this.footer = Util.createSpriteFromImage(this.getAsset("footer.jpg"), 'footer', false, null);
    this.footer.position = {x: 0, y: 650};
    this.footer.alpha = 0;
    this.addChild(this.footer);

    this.dcLogo = Util.createSpriteFromImage(this.getAsset("dc-logo.jpg", "ui"), 'instagram_btn', false, null);
    this.dcLogo.position = {x: 1100, y: 430};
    this.dcLogo.alpha = 0;
    this.addChild(this.dcLogo);

    this.facebookBindHandler = this.facebookHandler.bind(this);
    this.facebook = Util.createSpriteFromImage(this.getAsset("facebook-link.jpg", "ui"), 'facebook', true, this.facebookBindHandler);
    this.facebook.position = {x: 920, y: 695};
    this.addChild(this.facebook);

    this.instagramBindHandler = this.instagramHandler.bind(this);
    this.instagram = Util.createSpriteFromImage(this.getAsset("instagram-link.jpg", "ui"), 'instagram', true, this.instagramBindHandler);
    this.instagram.position = {x: 960, y: 695};
    this.addChild(this.instagram);

    this.facebook.alpha = this.instagram.alpha = 0;

    this.animIn();

};

APP.Page6.prototype.animIn = function (value) {
    TweenMax.to(this.imagesContainer.getChildAt(2), .5, {alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(1), .5, {delay: .5, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(0), .5, {delay: 1, alpha: 1, ease: Cubic.easeInOut});


    TweenMax.to(this.imagesContainer.getChildAt(5), .5, {delay: 1.5, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(4), .5, {delay: 2, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(3), .5, {delay: 2.5, alpha: 1, ease: Cubic.easeInOut});

    TweenMax.to(this.imagesContainer.getChildAt(8), .5, {delay: 3, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(7), .5, {delay: 3.5, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(6), .5, {delay: 4, alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
        TweenMax.to(this.dcLogo.position, .5, {x: 1024 - this.dcLogo.width});
        TweenMax.to(this.dcLogo, .5, {alpha: 1});
        TweenMax.to(this.footer, .5, {alpha: 1});

        this.facebook.alpha = this.instagram.alpha = 1;

    }, this)});
};

APP.Page6.prototype.animationLinks = function () {

};

APP.Page6.prototype.instagramHandler = function () {

};

APP.Page6.prototype.facebookHandler = function () {

};

APP.Page6.prototype.endAnimationImages = function (i) {
    if (i == 8) {
        TweenMax.to(this.dcLogo.position, .3, { x: '-=64', ease: Cubic.easeInOut, onComplete: $.proxy(this.animationLinks, this)});
        TweenMax.to(this.dcLogo, .3, { alpha: 1, ease: Cubic.easeInOut});
        //TweenMax.to(this.border, .5, { delay: .2, alpha: 1, ease: Cubic.easeInOut});
        TweenMax.to(this.footer, .5, { delay: .4, alpha: 1, ease: Cubic.easeInOut});
    }
};

APP.Page6.prototype.destroy = function () {
    Broadcaster.remove("LOAD_ASSETS_SCREEN_COMPLETE", this.onLoadAssetsScreenCompleteBind);
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};