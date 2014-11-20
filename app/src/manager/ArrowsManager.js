/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

APP.ArrowsManager = function () {
    PIXI.DisplayObjectContainer.call(this);

    this.leftArrow = PIXI.Sprite.fromImage(APP.Values.pathImages + "/ui/leftArrow.png");
    this.rightArrow = PIXI.Sprite.fromImage(APP.Values.pathImages + "/ui/rightArrow.png");

    this.leftArrow.anchor = this.rightArrow.anchor = {x: .5, y: .5};

    this.leftArrow.interactive = this.rightArrow.interactive = true;

    this.leftArrow.buttonMode = this.rightArrow.buttonMode = true;
    this.addChild(this.leftArrow);
    this.addChild(this.rightArrow);
};

APP.ArrowsManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

APP.ArrowsManager.prototype.resize = function () {

    this.leftArrow.position.x = 40;
    this.leftArrow.position.y = stageH / 2;

    this.rightArrow.position.x = stageW - 40;
    this.rightArrow.position.y = stageH / 2;

};