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
    this.loadAsset();
};

APP.BasePage.constructor = APP.BasePage;

APP.BasePage.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

APP.BasePage.prototype.loadAsset = function () {
    this.loader = new PIXI.AssetLoader(this.textures);
    var scope = this;
    this.loader.addEventListener("onComplete", function () {
        scope.removeChild(scope.preloader);
        scope.start();
    });
    this.loader.load();
};

APP.BasePage.prototype.start = function () {
};

APP.BasePage.prototype.animationIn = function () {

};

APP.BasePage.prototype.animationOut = function () {

};


APP.BasePage.prototype.getAsset = function (name, id) {
    var value = "";
    if (id != null)
        value = APP.Values.pathImages + id + '/' + name;
    else
        value = APP.Values.pathImages + this.id + '/' + name;
    return value;
};

APP.BasePage.prototype.destroy = function () {

};
