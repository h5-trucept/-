/**
 * Created by YZTC on 2017/4/16.
 */
define(["text!../../com/my/my.html","css!../../com/my/my.css"],function (html) {
    return{
    run:function () {
            $('.main').html(html)
        }
    }
});