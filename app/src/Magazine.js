/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */
var APP = APP || {};

APP.Magazine = function () {

    APP.Magazine.instance = this;

    this.stage = new PIXI.Stage(0x000000);

    this.renderer = PIXI.autoDetectRenderer(1024, 768);

    document.body.appendChild(this.renderer.view);
    this.renderer.view.style.position = "absolute";
    this.renderer.view.style.top = "0";
    this.renderer.view.style.left = "0";

    new APP.SceneModel();

    this.headerManager = new APP.HeaderManager();

    this.arrowsManager = new APP.ArrowsManager();

    this.screenManager = new APP.ScreenManager();

    this.footerManager = new APP.FooterManager();

    this.stage.addChild(this.headerManager);
    this.stage.addChild(this.screenManager);
    this.stage.addChild(this.arrowsManager);
    this.stage.addChild(this.footerManager);

    this.hammerParams = {'swipe_velocity': 0.01};
    this.hammer = new Hammer(document.body, this.hammerParams);

    this.listeners();

    requestAnimationFrame(this.update.bind(this));
};

APP.Magazine.prototype = Object.create(Object.prototype);
APP.Magazine.prototype.listeners = function () {

    this.swipeLeftHandlerBind = this.swipeLeftHandler.bind(this);
    this.swipeRightHandlerBind = this.swipeRightHandler.bind(this);

    this.hammer.on('swipeleft', this.swipeLeftHandlerBind);
    this.hammer.on('swiperight', this.swipeRightHandlerBind);

    this.arrowsManager.leftArrow.click = this.swipeRightHandlerBind;
    this.arrowsManager.rightArrow.click = this.swipeLeftHandlerBind;

};

APP.Magazine.prototype.swipeLeftHandler = function () {
    this.screenManager.swipeLeftHandler();
};

APP.Magazine.prototype.swipeRightHandler = function () {
    this.screenManager.swipeRightHandler();
};

APP.Magazine.prototype.resize = function () {
    this.renderer.resize(stageW, stageH);

    this.headerManager.resize();
    this.screenManager.resize();
    this.arrowsManager.resize();
    this.footerManager.resize();
};


APP.Magazine.prototype.update = function () {
    requestAnimationFrame(this.update.bind(this));
    this.renderer.render(this.stage)
};

