/**
 * Created by YZTC on 2017/4/11.
 */
$(function () {
   $(window).resize(function () {
       $('html').css("fontSize",$(window).innerWidth()/24+"px")
   });
    $(window).resize();


    var $$=Zepto;
    $$('.foot_nav ul li').tap(function () {
           var index=$$(this).index();
        $$('.foot_nav ul li').eq(index).addClass('animated bounce');
        setTimeout(function () {
            $$('.foot_nav ul li').eq(index).removeClass('animated bounce');
        },1000)

    });

});