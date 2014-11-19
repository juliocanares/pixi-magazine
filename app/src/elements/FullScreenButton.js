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

APP.FullScreenButton.prototype.fullScreenToggle = function () {
    this.f ? document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.cancelFullScreen() : document.body.mozRequestFullScreen ? document.body.mozRequestFullScreen() : document.body.webkitRequestFullScreen && document.body.webkitRequestFullScreen()
};
APP.FullScreenButton.prototype.onFullscreenChange = function () {
    this.f = !this.f;
    this.f ? (this.overImage.src = this.minOverSrc, this.upImage.src = this.minSrc) : (this.overImage.src = this.fullOverSrc, this.upImage.src = this.fullSrc)
};
