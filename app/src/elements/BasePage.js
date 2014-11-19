/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.BasePage = function (id) {
    PIXI.DisplayObjectContainer.call(this);

    this.id = id;

    this.data = APP.SceneModel.instance.getDataFromName(this.id);

    this.textures = [];

    for (var i = 0; i < this.data.textures.length; i++)
        this.textures[i] = APP.Values.pathImages + this.id + '/' + this.data.textures[i];

    this.preloader = new APP.Preloader();
    this.addChild(this.preloader);
};

APP.BasePage.constructor = APP.BasePage;

APP.BasePage.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
