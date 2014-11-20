/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page1 = function () {
    APP.BasePage.call(this, 'page1');
};

APP.Page1.constructor = APP.Page1;
APP.Page1.prototype = Object.create(APP.BasePage.prototype);

APP.Page1.prototype.start = function () {
    this.buildView();
};

APP.Page1.prototype.buildView = function () {

    this.image01 = Util.createSpriteFromImage(this.getAsset("image-01.jpg"), 'image_01', false, null);
    this.image01.width = 1024;
    this.image01.height = 768;

    this.image01.anchor.x = .5;
    this.image01.anchor.y = .5;

    this.image01.position.x = this.image01.position.x + this.image01.width * .5;
    this.image01.position.y = this.image01.position.y + this.image01.height * .5;


    this.addChild(this.image01);

    this.image02 = Util.createSpriteFromImage(this.getAsset("image-02.png"), 'image_02', false, null);
    this.image02.width = 1084;
    this.image02.height = 768;
    this.addChild(this.image02);

    this.image03 = Util.createSpriteFromImage(this.getAsset("image-03.png"), 'image_03', false, null);
    this.image03.width = 416;
    this.image03.height = 333;

    this.image03.position = {x: 540, y: 200};
    this.addChild(this.image03);


    this.image04 = Util.createSpriteFromImage(this.getAsset("image-04.png"), 'image_04', false, null);
    this.image04.width = 600;
    this.image04.height = 65;
    this.addChild(this.image04);

    this.image05 = Util.createSpriteFromImage(this.getAsset("image-05.png"), 'image_05', false, null);
    this.image05.width = 750;
    this.image05.height = 65;
    this.addChild(this.image05);

    this.image06 = Util.createSpriteFromImage(this.getAsset("image-06.png"), 'image_06', false, null);
    this.image06.width = 880;
    this.image06.height = 65;
    this.addChild(this.image06);


    this.image07 = Util.createSpriteFromImage(this.getAsset("image-07.png"), 'image_07', false, null);
    this.image07.width = 175;
    this.image07.height = 220;
    this.image07.position = {x: 50, y: 35};
    this.addChild(this.image07);


    this.image04.alpha = this.image05.alpha = this.image06.alpha = this.image07.alpha = 0;

    this.image04.position.y = 573;
    this.image05.position.y = this.image04.position.y + 65;
    this.image06.position.y = this.image05.position.y + 65;

    this.maskGraph = new PIXI.Graphics();
    this.maskGraph.beginFill(0xCCCCCC, 0);
    this.maskGraph.drawRect(this.image01.position.x - this.image01.width * .5, 0, 1024, 768);
    this.maskGraph.endFill();
    this.addChild(this.maskGraph);

    this.mask = this.maskGraph;

    this.animIn();
};

APP.Page1.prototype.animIn = function () {
    TweenMax.to(this.image01.scale, 3, {x: 1.1, y: 1.1});
    TweenMax.to(this.image02.position, 3, {x: "-=60", y: "+=60"});
    TweenMax.to(this.image03.position, 3, {x: "+=120", onComplete: $.proxy(function () {
        TweenMax.from(this.image04.position, .5, {x: -stageW});
        TweenMax.to(this.image04, .5, {alpha: 1});

        TweenMax.from(this.image05.position, .5, {delay: .3, x: -stageW});
        TweenMax.to(this.image05, .5, {delay: .3, alpha: 1});

        TweenMax.from(this.image06.position, .5, {delay: .7, x: -stageW});
        TweenMax.to(this.image06, .5, {delay: .7, alpha: 1});


        TweenMax.to(this.image07, .5, {delay: 1.2, alpha: 1});

    }, this)});


    // TODO ANIMATE IMAGES
};


APP.Page1.prototype.restart = function () {

};


APP.Page1.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};