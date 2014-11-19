/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.FullScreenButton = function (a, b, c, d) {
    APP.BaseButton.call(this, a, b);
    this.fullSrc = a;
    this.fullOverSrc = b;
    this.minSrc = c;
    this.minOverSrc = d;
    this.view.onclick = this.view.ontouchstart = this.fullScreenToggle.bind(this);

    this.f = !1;

    try {
        document.addEventListener("webkitfullscreenchange", this.onFullscreenChange.bind(this));
        document.addEventListener("mozfullscreenchange", this.onFullscreenChange.bind(this))
    } catch (e) {

    }
};