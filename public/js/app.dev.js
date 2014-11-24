var APP = APP || {};

APP.Magazine = function () {

    APP.Magazine.instance = this;

    this.stage = new PIXI.Stage(0x000000);

    this.renderer = PIXI.autoDetectRenderer(1024, 768);

    document.body.appendChild(this.renderer.view);
    this.renderer.view.style.position = "absolute";
    this.renderer.view.style.top = "0";
    this.renderer.view.style.left = "0";

    new APP.SceneModel();

    this.headerManager = new APP.HeaderManager();

    this.arrowsManager = new APP.ArrowsManager();

    this.screenManager = new APP.ScreenManager();

    this.footerManager = new APP.FooterManager();

    this.stage.addChild(this.headerManager);
    this.stage.addChild(this.screenManager);
    this.stage.addChild(this.arrowsManager);
    this.stage.addChild(this.footerManager);

    this.hammerParams = {'swipe_velocity': 0.01};
    this.hammer = new Hammer(document.body, this.hammerParams);

    this.listeners();

    requestAnimationFrame(this.update.bind(this));
};

APP.Magazine.prototype = Object.create(Object.prototype);
APP.Magazine.prototype.listeners = function () {

    this.swipeLeftHandlerBind = this.swipeLeftHandler.bind(this);
    this.swipeRightHandlerBind = this.swipeRightHandler.bind(this);

    this.hammer.on('swipeleft', this.swipeLeftHandlerBind);
    this.hammer.on('swiperight', this.swipeRightHandlerBind);

    this.arrowsManager.leftArrow.click = this.swipeRightHandlerBind;
    this.arrowsManager.rightArrow.click = this.swipeLeftHandlerBind;

};

APP.Magazine.prototype.swipeLeftHandler = function () {
    this.screenManager.swipeLeftHandler();
};

APP.Magazine.prototype.swipeRightHandler = function () {
    this.screenManager.swipeRightHandler();
};

APP.Magazine.prototype.resize = function () {
    this.renderer.resize(stageW, stageH);

    this.headerManager.resize();
    this.screenManager.resize();
    this.arrowsManager.resize();
    this.footerManager.resize();
};


APP.Magazine.prototype.update = function () {
    requestAnimationFrame(this.update.bind(this));
    this.renderer.render(this.stage)
};


var APP = APP || {};

APP.SceneModel = function () {

    APP.SceneModel.instance = this;

    this.data = [
        {
            name: "page1",
            textures: [
                "image-01.jpg" , "image-02.png", "image-03.png",
                "image-04.png", "image-05.png" , "image-06.png", "image-07.png"
            ]
        },
        {
            name: "page2",
            textures: [
                "angelo-cano-01.jpg" , "angelo-cano-02.jpg", "angelo-cano-03.jpg"
            ],
            links: {
                facebook: "",
                youtube_1: "",
                instagram: ""
            }
        },
        {
            name: "page3",
            textures: [
                "background.jpg" , "title.png", "box.png"
            ]
        },
        {
            name: "page4",
            textures: [
                "image01.jpg" , "image02.jpg", "image03.jpg" , "image04.png" , "image05.png", "image06.png"
            ]
        },
        {
            name: "page5",
            textures: [
                "background.jpg" , "title.png", "box.png"
            ]
        },
        {
            name: "page6",
            textures: [
                "image01.jpg" , "image02.jpg", "image03.jpg" ,
                "image04.jpg" , "image05.jpg", "image06.jpg" ,
                "image07.jpg" , "image08.jpg", "image09.jpg" ,
                "footer.jpg" , "border.png"
            ],
            links: {
                facebook: "",
                youtube_1: "",
                instagram: ""
            }
        },
        {
            name: "page7",
            textures: [
                "background.jpg" , "logo.png" , "text.png", "box.jpg"
            ]
        },
        {
            name: "page8",
            textures: [
                "image01.jpg" , "image02.png" , "image03.png", "image04.png",
                "image05.png" , "image06.png" , "image07.png"
            ]
        },
        {
            name: "page9",
            textures: [
                "background.jpg" , "costo-avisos.png" ,
                "avisos-standard.png" , "avisos-full.png" ,
                "forma-pago.png", "calendarios.png",
                "box1.png", "box2.png", "box3.png", "box4.png", "box5.png"
            ]
        },
        {
            name: "page10",
            textures: [
                "image01.jpg" , "image02.jpg", "image03.jpg" ,
                "image04.jpg" , "image05.jpg", "image06.jpg" ,
                "image07.jpg" , "image08.jpg"
            ]
        },
        {
            name: "page11",
            textures: [
                "background.jpg" ,
                "box1.png", "box2.png"
            ]
        }
    ]
};

APP.SceneModel.prototype.getDataFromId = function (id) {
    for (var i = this.data.length - 1; i >= 0; i--) {
        if (this.data[i].id == id)return this.data[i];
    }
    return this.data[0];
};


APP.SceneModel.prototype.getDataFromName = function (name) {
    for (var i = this.data.length - 1; i >= 0; i--) {
        if (this.data[i].name == name)return this.data[i];
    }
    return this.data[0];
};

var APP = APP || {};

APP.Values = function () {

};

APP.Values.remoteServer = "";

APP.Values.pathImages = APP.Values.remoteServer + "img/";

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

APP.BasePage.prototype.resize = function () {

    var a = stageW;
    var b = stageH;

    var c = b / stageHBase > a / stageWBase ? a / stageWBase : b / stageHBase;

    var d = 1.3;

    c > d && (c = d);

    this.scale.x = c;
    this.scale.y = c;

    this.position.x = a / 2 - stageWBase * c / 2;
    this.position.y = stageOffSetY + b / 2 - stageHBase * c / 2;

    if (this.preloader) {
        this.preloader.position.x = stageWBase * .5 - 200;
        this.preloader.position.y = stageHBase * .5 - 240;
    }

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

APP.Share = function () {
};

APP.Share.tweet = function () {

};
APP.Share.facebook = function () {

};

APP.Share.postToFacebook = function (a) {
    var b = {method: "feed", link: a.link, picture: a.picture, name: a.name, caption: a.caption, description: a.description};
    window.FB && FB.ui(b, function () {

    })
};

APP.Share.postToTwitter = function (a) {
    var b = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(a.text);
    a.link && (b += "&url=" + encodeURIComponent(a.link));
    window.open(b, "_blank", "height=300,width=550,resizable=1");
};
Util = function () {
};

Util.removeAllChildrens = function (f, d) {
    for (var c = f.children.length - 1; c >= 0; c--) {
        var a = true;
        if (d != null) {
            for (var b = 0; b < d.length; b++) {
                if (f.getChildAt(c) == d[b]) {
                    a = false
                }
            }
        }
        if (a) {
            var e = f.getChildAt(c);
            f.removeChild(e);
            e = null
        }
    }
};

Util.floatRand = function (b, a) {
    if (isNaN(a)) {
        a = b;
        b = 0
    }
    return Math.random() * (a - b) + b
};

Util.randomRange = function (b, a) {
    if (isNaN(a)) {
        a = b;
        b = 0
    }
    return Math.floor(Util.floatRand(b, a))
};


Util.createSprite = function (c, b, a, e) {
    var d = new PIXI.Sprite(PIXI.Texture.fromFrame(c));
    d.name = b;
    if (a) {
        d.setInteractive(true);
        d.buttonMode = true;
        if (e != null) {
            d.click = d.tap = e;
        }
    }
    return d
};

Util.createSpriteFromImage = function (c, b, a, e) {
    var d = new PIXI.Sprite(PIXI.Texture.fromImage(c));
    d.name = b;
    if (a) {
        d.setInteractive(true);
        d.buttonMode = true;
        if (e != null) {
            d.click = d.tap = e;
        }
    }
    return d
};

Util.centerToContainer = function (target, bound) {
    target.position.x = bound.width * .5 - target.width * .5;
    target.position.y = bound.height * .5 - target.height * .5;
};

Util.intersects = function (object1, object2) {
    var isCollision = false;
    if (object1.position.x < object2.position.x + object2.width && object1.position.x + object1.width > object2.position.x &&
        object1.position.y < object2.position.y + object2.height && object1.position.y + object1.height > object2.position.y + 35) {
        isCollision = true;
    }
    return isCollision;
};

Util.createText = function (b, a) {
    var c = new PIXI.Text(b, a);
    c.anchor.x = c.anchor.y = 0.5;
    return c
};

Util.removeThis = function (obj) {
    if (obj && obj.parent) {
        obj.parent.removeChild(obj);
        obj = null;
    }
};


Util.canFullScreeen = function () {
    return document.body.mozRequestFullScreen || document.body.webkitRequestFullScreen || document.body.webkitRequestFullScreen;
};

Util.iOSversion = function () {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return[parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3] || 0, 10)]
    }
};

Util.getInternetExplorerVersion = function () {
    var a = -1;
    if ("Microsoft Internet Explorer" == navigator.appName) {
        var b = navigator.userAgent, c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        null != c.exec(b) && (a = parseFloat(RegExp.$1))
    } else if ("Netscape" == navigator.appName) {
        var b = navigator.userAgent, c = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
        null != c.exec(b) && (a = parseFloat(RegExp.$1))
    }
    return a
};
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
var APP = APP || {};

APP.FooterManager = function () {
    PIXI.DisplayObjectContainer.call(this);
};

APP.FooterManager.constructor = APP.FooterManager;
APP.FooterManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

APP.FooterManager.prototype.resize = function () {
};

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
};

APP.HeaderManager.prototype.onTwitterPressed = function () {
};
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
var APP = APP || {};

APP.Page1 = function () {
    APP.BasePage.call(this, 'page1');
};

APP.Page1.constructor = APP.Page1;
APP.Page1.prototype = Object.create(APP.BasePage.prototype);

APP.Page1.prototype.start = function () {
    this.buildView();
};

APP.Page1.prototype.buildView = function () {

    this.image01 = Util.createSpriteFromImage(this.getAsset("image-01.jpg"), 'image_01', false, null);
    this.image01.width = 1024;
    this.image01.height = 768;

    this.image01.anchor.x = .5;
    this.image01.anchor.y = .5;

    this.image01.position.x = this.image01.position.x + this.image01.width * .5;
    this.image01.position.y = this.image01.position.y + this.image01.height * .5;


    this.addChild(this.image01);

    this.image02 = Util.createSpriteFromImage(this.getAsset("image-02.png"), 'image_02', false, null);
    this.image02.width = 1084;
    this.image02.height = 768;
    this.addChild(this.image02);

    this.image03 = Util.createSpriteFromImage(this.getAsset("image-03.png"), 'image_03', false, null);
    this.image03.width = 416;
    this.image03.height = 333;

    this.image03.position = {x: 540, y: 200};
    this.addChild(this.image03);


    this.image04 = Util.createSpriteFromImage(this.getAsset("image-04.png"), 'image_04', false, null);
    this.image04.width = 600;
    this.image04.height = 65;
    this.addChild(this.image04);

    this.image05 = Util.createSpriteFromImage(this.getAsset("image-05.png"), 'image_05', false, null);
    this.image05.width = 750;
    this.image05.height = 65;
    this.addChild(this.image05);

    this.image06 = Util.createSpriteFromImage(this.getAsset("image-06.png"), 'image_06', false, null);
    this.image06.width = 880;
    this.image06.height = 65;
    this.addChild(this.image06);


    this.image07 = Util.createSpriteFromImage(this.getAsset("image-07.png"), 'image_07', false, null);
    this.image07.width = 175;
    this.image07.height = 220;
    this.image07.position = {x: 50, y: 35};
    this.addChild(this.image07);


    this.image04.alpha = this.image05.alpha = this.image06.alpha = this.image07.alpha = 0;

    this.image04.position.y = 573;
    this.image05.position.y = this.image04.position.y + 65;
    this.image06.position.y = this.image05.position.y + 65;

    this.maskGraph = new PIXI.Graphics();
    this.maskGraph.beginFill(0xCCCCCC, 0);
    this.maskGraph.drawRect(this.image01.position.x - this.image01.width * .5, 0, 1024, 768);
    this.maskGraph.endFill();
    this.addChild(this.maskGraph);

    this.mask = this.maskGraph;

    this.animIn();
};

APP.Page1.prototype.animIn = function () {
    TweenMax.to(this.image01.scale, 3, {x: 1.1, y: 1.1});
    TweenMax.to(this.image02.position, 3, {x: "-=60", y: "+=60"});
    TweenMax.to(this.image03.position, 3, {x: "+=120", onComplete: $.proxy(function () {
        TweenMax.from(this.image04.position, .5, {x: -stageW});
        TweenMax.to(this.image04, .5, {alpha: 1});

        TweenMax.from(this.image05.position, .5, {delay: .3, x: -stageW});
        TweenMax.to(this.image05, .5, {delay: .3, alpha: 1});

        TweenMax.from(this.image06.position, .5, {delay: .7, x: -stageW});
        TweenMax.to(this.image06, .5, {delay: .7, alpha: 1});


        TweenMax.to(this.image07, .5, {delay: 1.2, alpha: 1});

    }, this)});


    // TODO ANIMATE IMAGES
};


APP.Page1.prototype.restart = function () {

};


APP.Page1.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
var APP = APP || {};

APP.Page10 = function () {
    APP.BasePage.call(this, 'page10');
};

APP.Page10.constructor = APP.Page10;
APP.Page10.prototype = Object.create(APP.BasePage.prototype);

APP.Page10.prototype.start = function () {
    this.buildView();
};

APP.Page10.prototype.buildView = function () {

    this.imagesContainer = new PIXI.DisplayObjectContainer();

    this.animInBind = this.animIn.bind(this);


    this.dataPosition = [
        {
            x: 0, y: 0, w: 164, h: 167
        },
        {
            x: 164, y: 0, w: 175, h: 167
        },
        {
            x: 338, y: 0, w: 175, h: 167
        },
        {
            x: 512, y: 0, w: 512, h: 503
        },
        {
            x: 858, y: 500, w: 167, h: 171
        },
        {
            x: 684, y: 500, w: 175, h: 171
        },
        {
            x: 512, y: 500, w: 172, h: 171
        },
        {
            x: 0, y: 167, w: 512, h: 504
        }
    ]
    for (var i = 0; i < 8; i++) {
        var imgName = 'image0' + (i + 1);
        var img = Util.createSpriteFromImage(this.getAsset(imgName + '.jpg'), imgName, false, null);
        img.width = this.dataPosition[i].w;
        img.height = this.dataPosition[i].h;
        img.position.x = this.dataPosition[i].x;
        img.position.y = this.dataPosition[i].y;
        this.imagesContainer.addChild(img);

        TweenMax.from(img, .5, {delay: i * .5, alpha: 0, ease: Cubic.easeInOut});

    }
    this.imagesContainer.position = {x: 0, y: 0};

    this.footer = Util.createSpriteFromImage(this.getAsset("footer.jpg"), "footer", false, null);
    this.footer.width = 1024;
    this.footer.height = 768;
    this.addChild(this.footer);

    this.addChild(this.imagesContainer);

    this.youtubeBindHandler = this.youtubeHandler.bind(this);
    this.youtube = Util.createSpriteFromImage(this.getAsset("youtube-link.jpg", "ui"), 'youtube', true, this.youtubeBindHandler);
    this.youtube.position = {x: 840, y: 705};
    this.addChild(this.youtube);

    this.facebookBindHandler = this.facebookHandler.bind(this);
    this.facebook = Util.createSpriteFromImage(this.getAsset("facebook-link.jpg", "ui"), 'facebook', true, this.facebookBindHandler);
    this.facebook.position = {x: 880, y: 705};
    this.addChild(this.facebook);

    this.twitterBindHandler = this.twitterHandler.bind(this);
    this.twitter = Util.createSpriteFromImage(this.getAsset("twitter-link.jpg", "ui"), 'twitter', true, this.twitterBindHandler);
    this.twitter.position = {x: 920, y: 705};
    this.addChild(this.twitter);

    this.instagramBindHandler = this.instagramHandler.bind(this);
    this.instagram = Util.createSpriteFromImage(this.getAsset("instagram-link.jpg", "ui"), 'instagram', true, this.instagramBindHandler);
    this.instagram.position = {x: 960, y: 705};

    this.addChild(this.instagram);
};

APP.Page10.prototype.animIn = function (value) {

};

APP.Page10.prototype.youtubeHandler = function () {
    window.open('https://www.youtube.com/user/DAKINEOriginal', "_blank");
};

APP.Page10.prototype.instagramHandler = function () {
    window.open('http://instagram.com/dakinenews', "_blank")
};

APP.Page10.prototype.twitterHandler = function () {
    window.open('https://twitter.com/dakinenews', "_blank");

};

APP.Page10.prototype.facebookHandler = function () {
    window.open('https://www.facebook.com/dakineperu?fref=ts', "_blank")
};

APP.Page10.prototype.endAnimationImages = function (i) {
    if (i == 8) {
        TweenMax.to(this.dcLogo.position, .3, { x: '-=64', ease: Cubic.easeInOut, onComplete: $.proxy(this.animationLinks, this)});
        TweenMax.to(this.dcLogo, .3, { alpha: 1, ease: Cubic.easeInOut});
        //TweenMax.to(this.border, .5, { delay: .2, alpha: 1, ease: Cubic.easeInOut});
        TweenMax.to(this.footer, .5, { delay: .4, alpha: 1, ease: Cubic.easeInOut});
    }
};

APP.Page10.prototype.destroy = function () {
    Broadcaster.remove("LOAD_ASSETS_SCREEN_COMPLETE", this.onLoadAssetsScreenCompleteBind);
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page11 = function () {
    APP.BasePage.call(this, 'page11');
};

APP.Page11.constructor = APP.Page11;
APP.Page11.prototype = Object.create(APP.BasePage.prototype);

APP.Page11.prototype.start = function () {

    this.currentSelector = null;
    this.oldSelector = null;

    this.buildView();
};

APP.Page11.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;

    this.addChild(this.background);

    this.logo = Util.createSpriteFromImage(this.getAsset("logo.png"), 'logo', false, null);
    this.logo.width = 483;
    this.logo.height = 206;
    this.logo.position = {x: stageW + 200, y: 20};
    this.logo.alpha = 0;
    this.addChild(this.logo);

    this.positionData = [
        {x1: 915, y1: 200, box: "box1", x2: 630, y2: 210, w2: 348, h2: 476},
        {x1: 325, y1: 570, box: "box2", x2: 90, y2: 275, w2: 345, h2: 307}
    ];

    this.selectorBindHandler = this.selectorHandler.bind(this);

    for (var i = 0; i < this.positionData.length; i++) {
        var posData = this.positionData[i];
        this.selector = Util.createSpriteFromImage(this.getAsset("selector-red.png", "ui"), i.toString(), true, this.selectorBindHandler);
        this.selector.position.x = posData.x1;
        this.selector.position.y = posData.y1;
        this.addChild(this.selector);

        this.box = Util.createSpriteFromImage(this.getAsset(posData.box + ".png"), posData.box, false, null);
        this.box.width = posData.w2;
        this.box.height = posData.h2;
        this.box.position.x = posData.x2;
        this.box.position.y = posData.y2;
        this.addChild(this.box);
        this.box.alpha = 0;

        this.selector.box = this.box;

        TweenMax.from(this.selector, .5, {delay: i * .5, alpha: 0, ease: Cubic.easeInOut});
    }

    this.animIn();
};

APP.Page11.prototype.animIn = function () {
    TweenMax.to(this.logo.position, 1, {x: 135, ease: Cubic.easeInOut});
    TweenMax.to(this.logo, 1, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page11.prototype.selectorHandler = function (e) {
    this.currentSelector = e.target.box;

    if (this.oldSelector != null && this.oldSelector != this.currentSelector)
        TweenMax.to(this.oldSelector, .5, {alpha: 0});
    if (this.currentSelector.alpha == 0)
        TweenMax.to(this.currentSelector, .5, {delay: .4, alpha: 1})

    this.oldSelector = this.currentSelector;
};

APP.Page11.prototype.showBox = function () {

};


APP.Page11.prototype.hideBox = function () {

};

APP.Page11.prototype.plusHandler = function () {
    if (this.box.alpha == 0)
        TweenMax.to(this.box, .5, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page11.prototype.minusHandler = function () {
    TweenMax.to(this.box, .5, {alpha: 0, ease: Cubic.easeInOut});
};

APP.Page11.prototype.restart = function () {

};


APP.Page11.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
var APP = APP || {};

APP.Page2 = function () {
    APP.BasePage.call(this, 'page2');
};

APP.Page2.constructor = APP.Page2;
APP.Page2.prototype = Object.create(APP.BasePage.prototype);

APP.Page2.prototype.start = function () {
    this.buildView();
};

APP.Page2.prototype.buildView = function () {

    this.image01 = Util.createSpriteFromImage(this.getAsset("angelo-cano-01.jpg"), 'angelo_cano_01', false, null);
    this.addChild(this.image01);

    this.image02 = Util.createSpriteFromImage(this.getAsset("angelo-cano-02.jpg"), 'angelo_cano_02', false, null);
    this.addChild(this.image02);

    this.image03 = Util.createSpriteFromImage(this.getAsset("angelo-cano-03.jpg"), 'angelo_cano_03', false, null);
    this.addChild(this.image03);

    this.image01.alpha = this.image02.alpha = this.image03.alpha = 0;

    this.instagramBindHandler = this.instagramHandler.bind(this);
    this.instagram = Util.createSpriteFromImage(this.getAsset("instagram-link.jpg", "ui"), 'instagram', true, this.instagramBindHandler);
    this.addChild(this.instagram);

    this.facebookBindHandler = this.facebookHandler.bind(this);
    this.facebook = Util.createSpriteFromImage(this.getAsset("facebook-link.jpg", "ui"), 'facebook', true, this.facebookBindHandler);
    this.addChild(this.facebook);

    this.playBindHandler = this.playHandler.bind(this);
    this.play = Util.createSpriteFromImage(this.getAsset("play-blue.png", "ui"), 'play', true, this.playBindHandler);

    this.addChild(this.play);

    this.instagram.alpha = this.facebook.alpha = this.play.alpha = 0;

    this.instagram.position = {x: 60, y: 625 };
    this.facebook.position = {x: 25, y: 625 };
    this.play.position = {x: 490, y: 360 };

    this.animIn();
};

APP.Page2.prototype.animIn = function () {
    this.imageFadeInOut(this.image01, $.proxy(function () {
        this.imageFadeInOut(this.image02, $.proxy(function () {
            TweenMax.to(this.image03, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
                this.animationLinks();
            }, this)});
        }, this));
    }, this));
};

APP.Page2.prototype.imageFadeInOut = function (target, complete) {
    TweenMax.to(target, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: function () {
        TweenMax.to(target, 1, {delay: 2, alpha: 0, ease: Cubic.easeOut, onComplete: complete})
    }});
};

APP.Page2.prototype.animationLinks = function () {
    TweenMax.to(this.instagram, 1, {delay: .5, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.facebook, 1, {alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.play, 1, {delay: 1.5, alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
        TweenMax.to(this.play, 1, {alpha: 0, repeat: -1, yoyo: true});
    }, this)});
};

APP.Page2.prototype.instagramHandler = function () {
    window.open('http://instagram.com/dcshoes_peru', "_blank")
};

APP.Page2.prototype.facebookHandler = function () {
    window.open('https://www.facebook.com/DCShoesPeru?fref=ts', "_blank")
};

APP.Page2.prototype.playHandler = function () {
    $(".swipebox-page2").trigger("click");
};

APP.Page2.prototype.restart = function () {

};


APP.Page2.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
var APP = APP || {};

APP.Page3 = function () {
    APP.BasePage.call(this, 'page3');
};

APP.Page3.constructor = APP.Page3;
APP.Page3.prototype = Object.create(APP.BasePage.prototype);

APP.Page3.prototype.start = function () {
    this.buildView();
};

APP.Page3.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);


    this.title = Util.createSpriteFromImage(this.getAsset("title.png"), 'title', false, null);
    this.title.width = 349;
    this.title.height = 191;
    this.title.alpha = 0;
    this.title.position = {x: -200, y: 195};
    this.addChild(this.title);

    this.plusBindHandler = this.plusHandler.bind(this);
    this.plus = Util.createSpriteFromImage(this.getAsset("plus-blue.png", "ui"), 'plus', true, this.plusBindHandler);
    this.plus.position = {x: -100, y: 390};
    this.plus.alpha = 0;
    this.addChild(this.plus);


    this.box = Util.createSpriteFromImage(this.getAsset("box.png"), 'box', false, null);
    this.box.width = 420;
    this.box.height = 363;
    this.box.position = {x: 560, y: 370};
    this.addChild(this.box);

    this.minusBindHandler = this.minusHandler.bind(this);
    this.minus = Util.createSpriteFromImage(this.getAsset("minus-blue.png", "ui"), 'minus', true, this.minusBindHandler);
    this.minus.width = this.minus.height = 63;
    this.minus.position = {x: 370, y: 450};
    TweenMax.to(this.minus, 1, {alpha: 0, repeat: -1, yoyo: true});
    this.box.addChild(this.minus);

    this.box.alpha = 0;

    this.animIn();
};

APP.Page3.prototype.animIn = function () {
    TweenMax.to(this.title.position, .5, {x: 50, ease: Cubic.easeInOut});
    TweenMax.to(this.title, .5, {alpha: 1, ease: Cubic.easeInOut});


    TweenMax.to(this.plus.position, .5, {delay: .3, x: 210, ease: Cubic.easeInOut});
    TweenMax.to(this.plus, .5, {delay: .3, alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
        TweenMax.to(this.plus, 1, {alpha: 0, repeat: -1, yoyo: true});
    }, this)});

};

APP.Page3.prototype.plusHandler = function () {
    if (this.box.alpha == 0)
        TweenMax.to(this.box, .5, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page3.prototype.minusHandler = function () {
    TweenMax.to(this.box, .5, {alpha: 0, ease: Cubic.easeInOut});
};

APP.Page3.prototype.restart = function () {

};


APP.Page3.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
var APP = APP || {};

APP.Page4 = function () {
    APP.BasePage.call(this, 'page4');
};

APP.Page4.constructor = APP.Page4;
APP.Page4.prototype = Object.create(APP.BasePage.prototype);

APP.Page4.prototype.start = function () {
    this.buildView();
};

APP.Page4.prototype.buildView = function () {

    this.image01 = Util.createSpriteFromImage(this.getAsset("image01.jpg"), 'image_01', false, null);
    this.addChild(this.image01);

    this.image02 = Util.createSpriteFromImage(this.getAsset("image02.jpg"), 'image_02', false, null);
    this.addChild(this.image02);

    this.image03 = Util.createSpriteFromImage(this.getAsset("image03.jpg"), 'image_03', false, null);
    this.addChild(this.image03);

    this.image04 = Util.createSpriteFromImage(this.getAsset("image04.png"), 'image_04', false, null);
    this.addChild(this.image04);
    this.image04.position.y = stageH + this.image04.height;

    this.image05 = Util.createSpriteFromImage(this.getAsset("image05.png"), 'image_05', false, null);
    this.image05.width = 225;
    this.image05.height = 280;
    this.image05.position.y = stageHBase - (this.image05.height + 40);
    this.addChild(this.image05);

    this.image06 = Util.createSpriteFromImage(this.getAsset("image06.png"), 'image_06', false, null);
    this.image06.width = 287;
    this.image06.height = 310;
    this.image06.position.x = stageWBase - this.image06.width;
    this.image06.position.y = stageHBase - (this.image06.height + 40);
    this.addChild(this.image06);


    this.image01.width = this.image02.width = this.image03.width = this.image04.width = 1024;
    this.image01.height = this.image02.height = this.image03.height = 768;

    this.image04.height = 263;

    this.image01.alpha = this.image02.alpha = this.image03.alpha = this.image04.alpha = this.image05.alpha = this.image06.alpha = 0;

    this.animIn();
};

APP.Page4.prototype.animIn = function () {
    this.imageFadeInOut(this.image01, $.proxy(function () {
        this.imageFadeInOut(this.image02, $.proxy(function () {
            TweenMax.to(this.image03, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
                TweenMax.to(this.image03.position, 1, {delay: 1, y: "-=100", ease: Cubic.easeInOut});
                TweenMax.to(this.image04, 1, {delay: 1, alpha: 1});
                TweenMax.to(this.image04.position, 1, {delay: 1, y: stageHBase - (this.image04.height + 40), ease: Cubic.easeInOut});
                TweenMax.to(this.image05, 1, {delay: 1.3, alpha: 1});
                TweenMax.to(this.image06, 1, {delay: 1.3, alpha: 1});
            }, this)});
        }, this));
    }, this));
};

APP.Page4.prototype.imageFadeInOut = function (target, complete) {
    TweenMax.to(target, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: function () {
        TweenMax.to(target, 1, {delay: 2, alpha: 0, ease: Cubic.easeOut, onComplete: complete})
    }});
};


APP.Page4.prototype.restart = function () {

};

APP.Page4.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
var APP = APP || {};

APP.Page5 = function () {
    APP.BasePage.call(this, 'page5');
};

APP.Page5.constructor = APP.Page5;
APP.Page5.prototype = Object.create(APP.BasePage.prototype);

APP.Page5.prototype.start = function () {
    this.buildView();
};

APP.Page5.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);

    this.title = Util.createSpriteFromImage(this.getAsset("title.png"), 'title', false, null);
    this.title.width = 255;
    this.title.height = 86;
    this.title.position = {x: -200, y: 520};
    this.title.alpha = 0;
    this.addChild(this.title);

    this.playBindHandler = this.playHandler.bind(this);
    this.play = Util.createSpriteFromImage(this.getAsset("play-blue.png", "ui"), 'play', true, this.playBindHandler);
    this.play.position = {x: -100, y: 615};
    this.play.alpha = 0;
    this.addChild(this.play);

    this.plusBindHandler = this.plusHandler.bind(this);
    this.plus = Util.createSpriteFromImage(this.getAsset("plus-blue.png", "ui"), 'plus', true, this.plusBindHandler);
    this.plus.position = {x: -100, y: 615};
    this.plus.alpha = 0;
    this.addChild(this.plus);

    this.box = Util.createSpriteFromImage(this.getAsset("box.png"), 'box', false, null);
    this.box.width = 517
    this.box.height = 453;
    this.box.position = {x: 440, y: 140};
    this.addChild(this.box);

    this.minusBindHandler = this.minusHandler.bind(this);
    this.minus = Util.createSpriteFromImage(this.getAsset("minus-blue.png", "ui"), 'minus', true, this.minusBindHandler);
    this.minus.width = this.minus.height = 63;
    this.minus.position = {x: 635, y: 590};
    TweenMax.to(this.minus, 1, {alpha: 0, repeat: -1, yoyo: true});
    this.box.addChild(this.minus);

    this.box.alpha = 0;

    this.animIn();
};

APP.Page5.prototype.animIn = function () {
    TweenMax.to(this.title.position, .5, {x: 50, ease: Cubic.easeInOut});
    TweenMax.to(this.title, .5, {alpha: 1, ease: Cubic.easeInOut});

    TweenMax.to(this.plus.position, .5, {delay: .3, x: 190, ease: Cubic.easeInOut});
    TweenMax.to(this.plus, .5, {delay: .3, alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
        TweenMax.to(this.plus, 1, {alpha: 0, repeat: -1, yoyo: true});
    }, this)});


    TweenMax.to(this.play.position, .5, {delay: .6, x: 130, ease: Cubic.easeInOut});
    TweenMax.to(this.play, .5, {delay: .6, alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
        TweenMax.to(this.play, 1, {alpha: 0, repeat: -1, yoyo: true});
    }, this)});

};

APP.Page5.prototype.playHandler = function () {
    $(".swipebox-page5").trigger("click");
};

APP.Page5.prototype.plusHandler = function () {
    if (this.box.alpha == 0)
        TweenMax.to(this.box, .5, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page5.prototype.minusHandler = function () {
    TweenMax.to(this.box, .5, {alpha: 0, ease: Cubic.easeInOut});
};

APP.Page5.prototype.restart = function () {

};


APP.Page5.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
var APP = APP || {};

APP.Page6 = function () {
    APP.BasePage.call(this, 'page6');
};

APP.Page6.constructor = APP.Page6;
APP.Page6.prototype = Object.create(APP.BasePage.prototype);

APP.Page6.prototype.start = function () {
    this.buildView();
};

APP.Page6.prototype.buildView = function () {

    this.background = new PIXI.Graphics();
    this.background.beginFill(0xFFFFFF);
    this.background.drawRect(0, 0, stageWBase, stageHBase);
    this.background.endFill();
    this.addChild(this.background);

    this.imagesContainer = new PIXI.DisplayObjectContainer();
    this.addChild(this.imagesContainer);

    this.animInBind = this.animIn.bind(this);

    for (var i = 0; i < 9; i++) {
        var imgName = 'image0' + (i + 1);
        var img = Util.createSpriteFromImage(this.getAsset(imgName + '.jpg'), imgName, false, null);
        img.width = 323;
        img.height = 180;
        img.position.x = (img.width + 5) * ( i % 3);
        img.position.y = (img.height + 5) * Math.floor(i / 3);
        img.alpha = 0;
        this.imagesContainer.addChild(img);
    }


    this.imagesContainer.position = {x: 25, y: 80};

    this.border = Util.createSpriteFromImage(this.getAsset("border.png"), 'border', false, null);
    this.border.position = {x: 10, y: 80};
    this.addChild(this.border);

    this.footer = Util.createSpriteFromImage(this.getAsset("footer.jpg"), 'footer', false, null);
    this.footer.position = {x: 0, y: 650};
    this.footer.alpha = 0;
    this.addChild(this.footer);

    this.dcLogo = Util.createSpriteFromImage(this.getAsset("dc-logo.jpg", "ui"), 'instagram_btn', false, null);
    this.dcLogo.position = {x: 1100, y: 430};
    this.dcLogo.alpha = 0;
    this.addChild(this.dcLogo);

    this.facebookBindHandler = this.facebookHandler.bind(this);
    this.facebook = Util.createSpriteFromImage(this.getAsset("facebook-link.jpg", "ui"), 'facebook', true, this.facebookBindHandler);
    this.facebook.position = {x: 920, y: 695};
    this.addChild(this.facebook);

    this.instagramBindHandler = this.instagramHandler.bind(this);
    this.instagram = Util.createSpriteFromImage(this.getAsset("instagram-link.jpg", "ui"), 'instagram', true, this.instagramBindHandler);
    this.instagram.position = {x: 960, y: 695};
    this.addChild(this.instagram);

    this.facebook.alpha = this.instagram.alpha = 0;

    this.animIn();

};

APP.Page6.prototype.animIn = function (value) {
    TweenMax.to(this.imagesContainer.getChildAt(2), .5, {alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(1), .5, {delay: .5, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(0), .5, {delay: 1, alpha: 1, ease: Cubic.easeInOut});


    TweenMax.to(this.imagesContainer.getChildAt(5), .5, {delay: 1.5, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(4), .5, {delay: 2, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(3), .5, {delay: 2.5, alpha: 1, ease: Cubic.easeInOut});

    TweenMax.to(this.imagesContainer.getChildAt(8), .5, {delay: 3, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(7), .5, {delay: 3.5, alpha: 1, ease: Cubic.easeInOut});
    TweenMax.to(this.imagesContainer.getChildAt(6), .5, {delay: 4, alpha: 1, ease: Cubic.easeInOut, onComplete: $.proxy(function () {
        TweenMax.to(this.dcLogo.position, .5, {x: 1024 - this.dcLogo.width});
        TweenMax.to(this.dcLogo, .5, {alpha: 1});
        TweenMax.to(this.footer, .5, {alpha: 1});

        this.facebook.alpha = this.instagram.alpha = 1;

    }, this)});
};

APP.Page6.prototype.animationLinks = function () {

};

APP.Page6.prototype.instagramHandler = function () {

};

APP.Page6.prototype.facebookHandler = function () {

};

APP.Page6.prototype.endAnimationImages = function (i) {
    if (i == 8) {
        TweenMax.to(this.dcLogo.position, .3, { x: '-=64', ease: Cubic.easeInOut, onComplete: $.proxy(this.animationLinks, this)});
        TweenMax.to(this.dcLogo, .3, { alpha: 1, ease: Cubic.easeInOut});
        //TweenMax.to(this.border, .5, { delay: .2, alpha: 1, ease: Cubic.easeInOut});
        TweenMax.to(this.footer, .5, { delay: .4, alpha: 1, ease: Cubic.easeInOut});
    }
};

APP.Page6.prototype.destroy = function () {
    Broadcaster.remove("LOAD_ASSETS_SCREEN_COMPLETE", this.onLoadAssetsScreenCompleteBind);
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page7 = function () {
    APP.BasePage.call(this, 'page7');
};

APP.Page7.constructor = APP.Page7;
APP.Page7.prototype = Object.create(APP.BasePage.prototype);

APP.Page7.prototype.start = function () {
    this.buildView();
};

APP.Page7.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);

    this.logo = Util.createSpriteFromImage(this.getAsset("logo.png"), 'logo', false, null);
    this.logo.width = 255;
    this.logo.height = 209;
    this.logo.position = {x: stageW + 200, y: 15};
    this.logo.alpha = 0;
    this.addChild(this.logo);

    this.text = Util.createSpriteFromImage(this.getAsset("text.png"), 'text', false, null);
    this.text.width = 352;
    this.text.height = 125;
    this.text.position = {x: stageW + 200, y: 25};
    this.text.alpha = 0;
    this.addChild(this.text);

    this.plusBindHandler = this.plusHandler.bind(this);
    this.plus = Util.createSpriteFromImage(this.getAsset("plus-blue.png", "ui"), 'plus', true, this.plusBindHandler);
    this.plus.position = {x: stageW + 200, y: 180};
    this.plus.alpha = 0;
    this.addChild(this.plus);

    this.box = Util.createSpriteFromImage(this.getAsset("box.jpg"), 'box', false, null);
    this.box.width = 1024;
    this.box.height = 768;
    this.addChild(this.box);

    this.minusBindHandler = this.minusHandler.bind(this);
    this.minus = Util.createSpriteFromImage(this.getAsset("minus-blue.png", "ui"), 'minus', true, this.minusBindHandler);
    this.minus.width = this.minus.height = 63;
    this.minus.position = {x: 1300, y: 1050};
    this.box.addChild(this.minus);

    this.box.alpha = 0;

    this.animIn();
};

APP.Page7.prototype.animIn = function () {
    TweenMax.to(this.logo.position, .5, {x: 225, ease: Cubic.easeInOut});
    TweenMax.to(this.logo, .5, {alpha: 1, ease: Cubic.easeInOut});

    TweenMax.to(this.text.position, .5, {delay: .3, x: 525, ease: Cubic.easeInOut});
    TweenMax.to(this.text, .5, {delay: .3, alpha: 1, ease: Cubic.easeInOut});

    TweenMax.to(this.plus.position, .5, {delay: .6, x: 575, ease: Cubic.easeInOut});
    TweenMax.to(this.plus, .5, {delay: .6, alpha: 1, ease: Cubic.easeInOut});
};

APP.Page7.prototype.playHandler = function () {
    $(".swipebox-page7").trigger("click");
};

APP.Page7.prototype.plusHandler = function () {
    if (this.box.alpha == 0)
        TweenMax.to(this.box, .5, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page7.prototype.minusHandler = function () {
    TweenMax.to(this.box, .5, {alpha: 0, ease: Cubic.easeInOut});
};

APP.Page7.prototype.restart = function () {

};


APP.Page7.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
var APP = APP || {};

APP.Page8 = function () {
    APP.BasePage.call(this, 'page8');
};

APP.Page8.constructor = APP.Page8;
APP.Page8.prototype = Object.create(APP.BasePage.prototype);

APP.Page8.prototype.start = function () {
    this.buildView();
};

APP.Page8.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("image01.jpg"), 'image_01', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);

    this.image02 = Util.createSpriteFromImage(this.getAsset("image02.png"), 'image_02', false, null);
    this.image02.width = 98;
    this.image02.height = 98;
    this.image02.position = {x: 250, y: 250};

    this.image03 = Util.createSpriteFromImage(this.getAsset("image03.png"), 'image_03', false, null);
    this.image03.width = 201;
    this.image03.height = 201;
    this.image03.position = {x: 198, y: 200};

    this.image04 = Util.createSpriteFromImage(this.getAsset("image04.png"), 'image_04', false, null);
    this.image04.width = 306;
    this.image04.height = 306;
    this.image04.position = {x: 145, y: 148};

    this.image05 = Util.createSpriteFromImage(this.getAsset("image05.png"), 'image_05', false, null);
    this.image05.width = 410;
    this.image05.height = 410;
    this.image05.position = {x: 94, y: 97};

    this.image06 = Util.createSpriteFromImage(this.getAsset("image06.png"), 'image_06', false, null);
    this.image06.width = 515;
    this.image06.height = 515;
    this.image06.position = {x: 40, y: 45};

    this.image02.alpha = this.image03.alpha = this.image04.alpha = this.image05.alpha = this.image06.alpha = 0;

    this.addChild(this.image06);
    this.addChild(this.image05);
    this.addChild(this.image04);
    this.addChild(this.image03);
    this.addChild(this.image02);


    this.image07 = Util.createSpriteFromImage(this.getAsset("image07.png"), 'image_07', false, null);
    this.image07.width = 505;
    this.image07.height = 362;
    this.image07.position = {x: 43, y: 118};
    this.addChild(this.image07);


    this.animIn();
};

APP.Page8.prototype.animIn = function () {

    var animation = new TimelineMax({repeat: -1});
    animation.to(this.image02, 0.1, {alpha: 1});
    animation.to(this.image03, 0.1, {delay: 0.1, alpha: 1});
    animation.to(this.image04, 0.1, {delay: 0.1, alpha: 1});
    animation.to(this.image05, 0.1, {delay: 0.1, alpha: 1});
    animation.to(this.image06, 0.1, {delay: 0.1, alpha: 1});
    animation.play();

    animation.timeScale(.8);
    /*   this.imageFadeInOut(this.image01, $.proxy(function () {
     this.imageFadeInOut(this.image02, $.proxy(function () {
     TweenMax.to(this.image03, 1, {alpha: 1 ease: Cubic.easeInOut, onComplete: $.proxy(function () {
     TweenMax.to(this.image03.position, 1, {delay: 1, y: "-=100", ease: Cubic.easeInOut});
     TweenMax.to(this.image04, 1, {delay: 1, alpha: 1});
     TweenMax.to(this.image04.position, 1, {delay: 1, y: stageH - this.image04.height + 15, ease: Cubic.easeInOut});
     TweenMax.to(this.image05, 1, {delay: 1.3, alpha: 1});
     TweenMax.to(this.image06, 1, {delay: 1.3, alpha: 1});

     }, this)});
     }, this));
     }, this));*/
};

APP.Page8.prototype.imageFadeInOut = function (target, complete) {
    TweenMax.to(target, 1, {alpha: 1, ease: Cubic.easeInOut, onComplete: function () {
        TweenMax.to(target, 1, {delay: 2, alpha: 0, ease: Cubic.easeOut, onComplete: complete})
    }});
};


APP.Page8.prototype.restart = function () {

};

APP.Page8.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */

var APP = APP || {};

APP.Page9 = function () {
    APP.BasePage.call(this, 'page9');
};

APP.Page9.constructor = APP.Page9;
APP.Page9.prototype = Object.create(APP.BasePage.prototype);

APP.Page9.prototype.start = function () {

    this.currentSelector = null;
    this.oldSelector = null;

    this.buildView();
};

APP.Page9.prototype.buildView = function () {

    this.background = Util.createSpriteFromImage(this.getAsset("background.jpg"), 'background', false, null);
    this.background.width = 1024;
    this.background.height = 768;
    this.addChild(this.background);

    this.positionData = [
        {label: "costo-avisos", x1: 175, y1: 115, w1: 62, h1: 24, x2: 195, y2: 145, box: "box1", x3: 210, y3: 160, w2: 431, h2: 271} ,
        {label: "avisos-standard", x1: 435, y1: 115, w1: 62, h1: 24, x2: 455, y2: 145, box: "box2", x3: 130, y3: 155, w2: 416, h2: 332},
        {label: "avisos-full", x1: 755, y1: 115, w1: 53, h1: 26, x2: 770, y2: 145, box: "box3", x3: 520, y3: 160, w2: 416, h2: 247},
        {label: "forma-pago", x1: 155, y1: 600, w1: 51, h1: 26, x2: 170, y2: 630, box: "box4", x3: 185, y3: 560, w2: 533, h2: 126},
        {label: "calendarios", x1: 860, y1: 600, w1: 85, h1: 12, x2: 890, y2: 630, box: "box5", x3: 440, y3: 470, w2: 470, h2: 218}
    ];

    this.selectorBindHandler = this.selectorHandler.bind(this);

    for (var i = 0; i < this.positionData.length; i++) {
        var posData = this.positionData[i];
        this.label = Util.createSpriteFromImage(this.getAsset(posData.label + '.png'), posData.label, false, null);
        this.label.width = posData.w1;
        this.label.height = posData.h1;
        this.label.position.x = posData.x1;
        this.label.position.y = posData.y1;
        this.addChild(this.label);

        this.selector = Util.createSpriteFromImage(this.getAsset("selector-blue.png", "ui"), i.toString(), true, this.selectorBindHandler);
        this.selector.position.x = posData.x2;
        this.selector.position.y = posData.y2;
        this.addChild(this.selector);

        this.box = Util.createSpriteFromImage(this.getAsset(posData.box + ".png"), posData.box, false, null);
        this.box.width = posData.w2;
        this.box.height = posData.h2;
        this.box.position.x = posData.x3;
        this.box.position.y = posData.y3;
        this.addChild(this.box);
        this.box.alpha = 0;

        this.selector.box = this.box;

        TweenMax.from(this.label, .5, {delay: i * .5, alpha: 0, ease: Cubic.easeInOut});
        TweenMax.from(this.selector, .5, {delay: i * .5, alpha: 0, ease: Cubic.easeInOut});
    }


    this.animIn();
};

APP.Page9.prototype.animIn = function () {

};

APP.Page9.prototype.selectorHandler = function (e) {
    this.currentSelector = e.target.box;

    if (this.oldSelector != null && this.oldSelector != this.currentSelector)
        TweenMax.to(this.oldSelector, .5, {alpha: 0});
    if (this.currentSelector.alpha == 0)
        TweenMax.to(this.currentSelector, .5, {delay: .4, alpha: 1})

    this.oldSelector = this.currentSelector;
};

APP.Page9.prototype.showBox = function () {

};


APP.Page9.prototype.hideBox = function () {

};

APP.Page9.prototype.plusHandler = function () {
    if (this.box.alpha == 0)
        TweenMax.to(this.box, .5, {alpha: 1, ease: Cubic.easeInOut});
};

APP.Page9.prototype.minusHandler = function () {
    TweenMax.to(this.box, .5, {alpha: 0, ease: Cubic.easeInOut});
};

APP.Page9.prototype.restart = function () {

};


APP.Page9.prototype.destroy = function () {
    Util.removeAllChildrens(this, null);
    Util.removeThis(this);
};
var APP = APP || {};


APP.Preloader = function () {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage("img/ui/loader.png"));
    
    this.width = 400;
    this.height = 400;

};
APP.Preloader.constructor = APP.Preloader;
APP.Preloader.prototype = Object.create(PIXI.Sprite.prototype);

