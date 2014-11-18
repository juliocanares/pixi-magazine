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