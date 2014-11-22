/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page10 = function () {
    APP.BasePage.call(this, 'page10');
};

APP.Page10.constructor = APP.Page10;
APP.Page10.prototype = Object.create(APP.BasePage.prototype);

APP.Page10.prototype.start = function () {
    this.buildView();
};

APP.Page10.prototype.buildView = function () {

    this.imagesContainer = new PIXI.DisplayObjectContainer();

    this.animInBind = this.animIn.bind(this);


    this.dataPosition = [
        {
            x: 0, y: 0, w: 164, h: 167
        },
        {
            x: 164, y: 0, w: 175, h: 167
        },
        {
            x: 338, y: 0, w: 175, h: 167
        },
        {
            x: 512, y: 0, w: 512, h: 503
        },
        {
            x: 858, y: 500, w: 167, h: 171
        },
        {
            x: 684, y: 500, w: 175, h: 171
        },
        {
            x: 512, y: 500, w: 172, h: 171
        },
        {
            x: 0, y: 167, w: 512, h: 504
        }
    ]
    for (var i = 0; i < 8; i++) {
        var imgName = 'image0' + (i + 1);
        var img = Util.createSpriteFromImage(this.getAsset(imgName + '.jpg'), imgName, false, null);
        img.width = this.dataPosition[i].w;
        img.height = this.dataPosition[i].h;
        img.position.x = this.dataPosition[i].x;
        img.position.y = this.dataPosition[i].y;
        this.imagesContainer.addChild(img);

        TweenMax.from(img, .5, {delay: i * .5, alpha: 0, ease: Cubic.easeInOut});

    }
    this.imagesContainer.position = {x: 0, y: 0};

    this.footer = Util.createSpriteFromImage(this.getAsset("footer.jpg"), "footer", false, null);
    this.footer.width = 1024;
    this.footer.height = 768;
    this.addChild(this.footer);

    this.addChild(this.imagesContainer);

    this.youtubeBindHandler = this.youtubeHandler.bind(this);
    this.youtube = Util.createSpriteFromImage(this.getAsset("youtube-link.jpg", "ui"), 'youtube', true, this.youtubeBindHandler);
    this.youtube.position = {x: 840, y: 705};
    this.addChild(this.youtube);

    this.facebookBindHandler = this.facebookHandler.bind(this);
    this.facebook = Util.createSpriteFromImage(this.getAsset("facebook-link.jpg", "ui"), 'facebook', true, this.facebookBindHandler);
    this.facebook.position = {x: 880, y: 705};
    this.addChild(this.facebook);

    this.twitterBindHandler = this.twitterHandler.bind(this);
    this.twitter = Util.createSpriteFromImage(this.getAsset("twitter-link.jpg", "ui"), 'twitter', true, this.twitterBindHandler);
    this.twitter.position = {x: 920, y: 705};
    this.addChild(this.twitter);

    this.instagramBindHandler = this.instagramHandler.bind(this);
    this.instagram = Util.createSpriteFromImage(this.getAsset("instagram-link.jpg", "ui"), 'instagram', true, this.instagramBindHandler);
    this.instagram.position = {x: 960, y: 705};

    this.addChild(this.instagram);
};

APP.Page10.prototype.animIn = function (value) {

};

APP.Page10.prototype.youtubeHandler = function () {
    window.open('https://www.youtube.com/user/DAKINEOriginal', "_blank");
};

APP.Page10.prototype.instagramHandler = function () {
    window.open('http://instagram.com/dakinenews', "_blank")
};

APP.Page10.prototype.twitterHandler = function () {
    window.open('https://twitter.com/dakinenews', "_blank");

};

APP.Page10.prototype.facebookHandler = function () {
    window.open('https://www.facebook.com/dakineperu?fref=ts', "_blank")
};

APP.Page10.prototype.endAnimationImages = function (i) {
    if (i == 8) {
        TweenMax.to(this.dcLogo.position, .3, { x: '-=64', ease: Cubic.easeInOut, onComplete: $.proxy(this.animationLinks, this)});
        TweenMax.to(this.dcLogo, .3, { alpha: 1, ease: Cubic.easeInOut});
        //TweenMax.to(this.border, .5, { delay: .2, alpha: 1, ease: Cubic.easeInOut});
        TweenMax.to(this.footer, .5, { delay: .4, alpha: 1, ease: Cubic.easeInOut});
    }
};

APP.Page10.prototype.destroy = function () {
    Broadcaster.remove("LOAD_ASSETS_SCREEN_COMPLETE", this.onLoadAssetsScreenCompleteBind);
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};