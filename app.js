require.config({
   paths:{
       'swiper':'js/swiper-3.4.2.jquery.min',
       'zepto':'js/zepto',
       'zepto-mobile':'js/zepto_mobile',
       'backbone':'js/libs/backbone',
       'underscore':'js/libs/underscore',
       'jquery':'js/libs/jquery',
       'fastclick':'js/libs/fastclick',
       'index':"js/index",
       'text':'js/libs/text',
       'css':'js/libs/css',
       "su":'com/super/super'
   },
   shim:{
       "index":["jquery","zepto"]
   }
});
//
// var attachFastClick = require(['fastclick']);
// attachFastClick(document.body);

require(['jquery','backbone',"zepto","index"],function ($,backbone,$$ ) {      //参数一一对应

    // attachFastClick(document.body);

    var Router=backbone.Router.extend({
        routes:{
            '':'ho',
            'home':'ho',
            'super':'su',
            'shopcar':'sh',
            'my':'my'
        },
        ho:function () {
            require(['com/home/home'],function (home) {
                home.run();
                home.ajax();
            })
        },
        su:function () {
            require(['com/super/super'],function(supe) {
                supe.run();
                supe.ajax();
                supe.cm();
            })
        },
        sh:function () {
            require(['com/shopcar/shopcar'],function(shop) {
                shop.run();
            })
        },
        my:function () {
            require(['com/my/my'],function (my) {
                my.run();
            })
        }
    });

    var router=new Router();
    backbone.history.start();


});
// setTimeout(function () {
//     $('#home').trigger("click");
// },1000);