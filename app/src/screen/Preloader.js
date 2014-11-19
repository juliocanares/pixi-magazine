/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};


APP.Preloader = function () {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage("img/ui/loader.png"));
    
    this.width = 400;
    this.height = 400;

};
APP.Preloader.constructor = APP.Preloader;
APP.Preloader.prototype = Object.create(PIXI.Sprite.prototype);

