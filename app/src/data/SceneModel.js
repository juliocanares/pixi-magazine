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
