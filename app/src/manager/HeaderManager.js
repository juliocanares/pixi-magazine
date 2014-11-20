/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */
var APP = APP || {};

APP.HeaderManager = function () {
    PIXI.DisplayObjectContainer.call(this);

    this.controlDiv = document.createElement("div");
    this.controlDiv.style.position = "absolute";
    this.controlDiv.style.right = "174px";
    this.controlDiv.style.top = "0px";

    this.twitterButton = new APP.BaseButton(
        APP.Values.pathImages + "ui/twitter.png",
        APP.Values.pathImages + "ui/twitter.png"
    );
    this.twitterButton.view.style.position = "absolute";
    this.twitterButton.view.style.left = "129px";
    this.twitterButton.view.onclick = this.twitterButton.ontouchstart = this.onTwitterPressed.bind(this);
    this.twitterButton.view.style.zIndex = 300;

    this.facebookButton = new APP.BaseButton(
        APP.Values.pathImages + "ui/facebook.png",
        APP.Values.pathImages + "ui/facebook.png"
    );

    this.facebookButton.view.style.position = "absolute";
    this.facebookButton.view.style.left = "85px";
    this.facebookButton.view.onclick = this.facebookButton.ontouchstart = this.onFacebookPressed.bind(this);
    this.facebookButton.view.style.zIndex = 300;

    this.fullscreenButton = new APP.FullScreenButton(
        APP.Values.pathImages + "ui/fullscreen.png",
        APP.Values.pathImages + "ui/fullscreen.png",
        APP.Values.pathImages + "ui/fullscreen.png",
        APP.Values.pathImages + "ui/fullscreen.png"
    );

    this.fullscreenButton.view.style.position = "absolute";
    this.fullscreenButton.view.style.left = "0px";
    this.fullscreenButton.view.style.zIndex = 300;

    document.body.appendChild(this.controlDiv);

    this.controlDiv.appendChild(this.twitterButton.view);
    this.controlDiv.appendChild(this.facebookButton.view);

    this.controlDiv.appendChild(this.fullscreenButton.view);

};

APP.HeaderManager.constructor = APP.HeaderManager;
APP.HeaderManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

APP.HeaderManager.prototype.resize = function () {

};

APP.HeaderManager.prototype.onFacebookPressed = function () {
    APP.Share.postToFacebook(
        {
            link: "http://www.juliocanares.com/lab/init/html5/web/revista/",
            picture: "http://www.juliocanares.com/lab/init/html5/web/revista/img/ui/fish.png",
            name: "Revista",
            caption: "",
            description: "revista"
        }
    );
};

APP.HeaderManager.prototype.onTwitterPressed = function () {
    APP.Share.postToTwitter(
        {
            link: "http://www.juliocanares.com/lab/init/html5/web/revista/",
            text: "revista"
        }
    );
};