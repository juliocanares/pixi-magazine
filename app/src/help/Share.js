/**
 *Author : www.juliocanares.com/cv
 *Email : juliocanares@gmail.com
 */


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