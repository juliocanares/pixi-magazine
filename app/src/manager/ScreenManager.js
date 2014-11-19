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
};
APP.ScreenManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

APP.ScreenManager.constructor = APP.ScreenManager;
