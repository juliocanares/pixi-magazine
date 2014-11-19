/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

APP.ScreenManager = function () {

    PIXI.DisplayObjectContainer.call(this);

    this.screenContainer = new PIXI.DisplayObjectContainer();
    this.addChild(this.screenContainer);

    this._currentScreenID = 0;

    this.currentScreen = null;

    this.count = 0;

    this.screens = [APP.Page1 , APP.Page2, APP.Page3, APP.Page4, APP.Page5 , APP.Page6, APP.Page7 , APP.Page8, APP.Page9, APP.Page10, APP.Page11];

    this.currentScreenID = 0;

    this.setupListeners();

};
APP.ScreenManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

APP.ScreenManager.constructor = APP.ScreenManager;

APP.ScreenManager.prototype.setupListeners = function () {

    this.canChangeScreen = true;

    this.goScreenCleanHandlerBind = this.goScreenCleanHandler.bind(this);
    this.goScreenChangeHandlerBind = this.goScreenChangeHandler.bind(this);

    Broadcaster.listen('GO_SCREEN_CLEAN', this.goScreenCleanHandlerBind);
    Broadcaster.listen('GO_SCREEN_CHANGE', this.goScreenChangeHandlerBind);
    Broadcaster.dispatch('GO_SCREEN_CHANGE');

};

APP.ScreenManager.prototype.swipeLeftHandler = function () {
    this.currentScreenID++;
};

APP.ScreenManager.prototype.swipeRightHandler = function () {
    this.currentScreenID--;
};

APP.ScreenManager.prototype.goScreenCleanHandler = function () {
    if (this.currentScreen) {
        this.currentScreen.destroy();
    }
};

APP.ScreenManager.prototype.goScreenChangeHandler = function () {
    Broadcaster.dispatch('GO_SCREEN_CLEAN');
    this.currentScreen = new this.screens[this.currentScreenID]();
    $('#xOfy').text(this.currentScreenID + 1);
    this.currentScreen.resize();
    this.screenContainer.addChild(this.currentScreen);
};

APP.ScreenManager.prototype.resize = function () {
    if (this.currentScreen)
        this.currentScreen.resize();
};

Object.defineProperty(APP.ScreenManager.prototype, "currentScreenID", {
        get: function () {
            return this._currentScreenID;
        },
        set: function (value) {
            this._currentScreenID = value;

            this.canChangeScreen = !(this._currentScreenID < 0 || this._currentScreenID > this.screens.length - 1);

            if (this._currentScreenID <= 0) {
                this._currentScreenID = 0;
                APP.Magazine.instance.arrowsManager.leftArrow.visible = false;
            } else {
                APP.Magazine.instance.arrowsManager.leftArrow.visible = true;
            }

            if (this._currentScreenID >= this.screens.length - 1) {
                this._currentScreenID = this.screens.length - 1;
                APP.Magazine.instance.arrowsManager.rightArrow.visible = false;
            } else {
                APP.Magazine.instance.arrowsManager.rightArrow.visible = true;
            }

            if (this.canChangeScreen)
                Broadcaster.dispatch('GO_SCREEN_CHANGE');

        }}
);