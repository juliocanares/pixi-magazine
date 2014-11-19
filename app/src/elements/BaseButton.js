/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.BaseButton = function (a, b) {
    this.view = document.createElement("div");
    this.view.style.cursor = "pointer";
    this.overImage = new Image;
    this.overImage.style.position = "absolute";
    this.overImage.style.opacity = 0;
    this.overImage.src = b;
    this.upImage = new Image;
    this.upImage.src = a;
    this.view.appendChild(this.overImage);
    this.view.appendChild(this.upImage);
};
