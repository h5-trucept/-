/**
 * Created by YZTC on 2017/4/12.
 */
define(["text!../../com/super/super.html","css!../../com/super/super.css"],function (html) {
    return{
        run:function () {
            $('.main').html(html);
        },
        ajax:function () {

                $.getJSON("json/category.json",function (da) {
                    runing(da.data);

                });

            },
            cm:function(){

                var $$=Zepto;
                var dl=document.querySelector('.n2-tolista');
                var of=document.querySelector('#cuy');
                function left() {
                    $('.n2-tolistb i').attr("class","fa fa-angle-down fa-lg");

                    $('.n2-tolista i').toggleClass("fa fa-angle-down fa-lg").toggleClass("fa fa-angle-up fa-lg");

                    $('#lb_list').slideToggle(10);

                    $('#lb_tist').css("display","none");

                    setTimeout(function () {
                        if($('#lb_tist').css("display")=="block"||$('#lb_list').css("display")=="block"){
                            $('.off').attr("class","showstat off")
                        }else{
                            $('.off').attr("class","off")
                        }
                    },20)
                }
                dl.addEventListener("touchstart",ct=function () {
                    left();
                   $$('#cuy').unbind().click(function () {
                        left();

                    });
                });

                var db=document.querySelector('.n2-tolistb');
                function right() {


                    $('.n2-tolista i').attr("class","fa fa-angle-down fa-lg");

                    $('.n2-tolistb i').toggleClass("fa fa-angle-down fa-lg").toggleClass("fa fa-angle-up fa-lg");
                    $('#lb_tist').slideToggle(100);


                    if($('#lb_list').css("display")=="block"){

                        $('.off').removeClass("showstat")


                    }
                    $('#lb_list').css("display","none");

                    $('.off').toggleClass("showstat");
                }
                db.addEventListener("touchstart",function () {
                    right();
                    $$('#cuy').unbind().click(function () {
                        right();

                    });

                });



            }
    }
});

function runing(da) {
"use strict";
    var $$=Zepto;

/*----------------------------------------*/

    var data=da.categories;
    var obj=da.products;





    /*---------------------------*/

    rup(obj[data[0].id]);//初始化第一页商品
    xing(obj[data[0].id]);

    for(var i=0;i<data.length;i++) {

        var li = $('<li></li>').html(data[i].name).appendTo($('.n2-list'));
        if (data[i].flag != "") {
            $('<img>').attr("src", data[i].flag).appendTo(li);
        }
    }
//左边横幅拦




//左边决定上边的分类

    for (var  j = 0; j < data[0].cids.length; j++) {
        $('<li></li>').html(data[0].cids[j].name).appendTo($('#lb_list'));

    }
    $$('#lb_list li').click(function () {
        $$('#lb_list li').css({
            "color":"#000",
            "outline":"none"
        });
        $(this).css({
            "color":"#f8d511",
            "outline":"1px solid yellow"
        });
        });
        //初始化上边
            $$('.n2-list li').click(function () {

                var index = $$(this).index();
                var cid = data[index].cids;
                var kid = data[index].id;


                    $('#lb_list').empty();
                    $$('.n2-list li').css("borderLeft","none");
                    $$(this).css("borderLeft","4px solid yellow");
                    $('<li>全部分类</li>').appendTo($('#lb_list'));


                for (let j = 0; j < cid.length; j++) {
                    if(cid[j].pcid!=undefined){
                        if (cid[j].pcid ==kid) {
                            $('<li></li>').html(cid[j].name).appendTo($('#lb_list'))
                        }
                    }
                }

                /*-------------------------------*/
                // 下面商品
                // console.log($(da.products).attr("103532"));一种办法
                // console.log(da.products[103532]);

                for(let k in obj){
                    if(kid==k) {
                        console.log(obj[k]);
                        rup(obj[k]);
                        xing(obj[k]);
                        animat();
                        $$('#lb_list li').unbind().click(function () {
                            $$('#lb_list li').css({
                                "color":"#000",
                                "outline":"none"
                            });
                            $(this).css({
                                "color":"#f8d511",
                                "outline":"1px solid yellow"
                            });
                            var index = $$(this).index();



                            if (cid[index].id == 0) {
                                rup(obj[k]);
                                xing(obj[k]);
                                animat();
                            }else{
                                console.log(obj[k])
                                var ne=_.filter(obj[k],function (num) {

                                    return num.child_cid==cid[index].id;
                                });
                                rup(ne);
                                xing(ne);
                                animat();
                            }

                            /*-----*/

                            /*-----*/

                        });
                    }
                }

            });

    function xing(i) {
        $$('#lb_tist li').click(function () {
            $$('#lb_tist li').css({
                "color":"#000",
                "outline":"none"
            });
            $(this).css({
                "color":"#f8d511",
                "outline":"1px solid yellow"
            });
            if($(this).text()=="价格最低"){
                var ni=_.sortBy(i,function (num) {
                    return Number(num.price);

                });
                rup(ni);
            }
            // if($(this).text()=="价格最高"){
            //     ni=_.sortBy(i,function (num) {
            //         return -Number(num.price);
            //
            //     });
            //     rup(ni);
            // }
            if($(this).text()=="价格最高"){
               ni=i.sort(function (a,b) {
                   return b.price-a.price
               });
                rup(ni);
            }
            if($(this).text()=="销量排序"){
                ni=_.sortBy(i,function (num) {
                    return Number(num.product_num);
                });
                rup(ni);
            }
            if($(this).text()=="综合排序"){
                ni=_.sortBy(i,function (num) {
                    return num

                });
                rup(ni);
            }
        });


    }
    /*---------*/
    function rup(ob){

        for(var i=0;i<ob.length;i++){

            if(i==0){$('.menu_shop').empty();}
            var li = $("<li><img><div class='v_menu'><h3></h3><h4><span></span><i></i></h4><h5></h5><p><i></i><em></em><code class='me_code'>+</code></p></div></li>").appendTo('.menu_shop')
            li.find('img').attr("src", ob[i].img);
            li.find('h3').html(ob[i].name);
            if (ob[i].is_xf != "1") {
                li.find('h4 span').remove();
            }
            if (ob[i].pm_desc == "") {
                li.find('h4 i').remove();
            }
            li.find('h4 span').html("精选");
            li.find('h4 i').html(ob[i].pm_desc);
            li.find('h5').html(ob[i].specifics);
            // li.find('h5').html(ob[i].specifics);
            li.find('p i').html("￥" + ob[i].price);
            li.find('p em').html(ob[i].market_price);
        }
    }
    animat();
    function animat() {
        var istru=false;
        var clu;
        $('.v_menu .me_code').click(function () {
            $(this).css("display","none");
            ani($(this));
            var div=$('<div class="price_num"><code class="left_rem">-</code><span>1</span><code class="right_add">+</code></div>').appendTo($(this).parents('.v_menu'));
            var obj={};
            obj.name=$(this).parents('li').find('h3').text();
            obj.price=$(this).parents('li').find('i').text();
            obj.img=$(this).parents('li').find('img').attr("src");
            obj.num=$(this).parents('li').find('.price_num span').text();
            var  local=localStorage.getItem('boom');
            console.log(local);
            if(local){
                var arr=JSON.parse(local);
                var tauda=true;
                for(var i=0;i<arr.length;i++){
                    if(arr[i].name==obj.name){
                        arr[i].num++;
                        tauda=false;
                    }
                }
                if(tauda){
                    arr.push(obj);
                }
            }else{
                arr=[];
                arr.push(obj);
                localStorage.setItem("boom",JSON.stringify(arr));
            }
            console.log(JSON.parse(localStorage.boom));
            localStorage.boom=JSON.stringify(arr);
            $('.left_rem').unbind().click(function () {
                var p_n=$(this).siblings('span').text();

                if(p_n>0){
                    p_n--;
                    $(this).siblings('span').text(p_n);

                }
                if(p_n==0){
                    $(this).parents('.price_num').css("display","none");
                    $(this).parents('.v_menu').find('.me_code').css("display","block");
                    p_n=1;
                }

                var obj={};
                obj.name=$(this).parents('li').find('h3').text();
                obj.price=$(this).parents('li').find('i').text();
                obj.img=$(this).parents('li').find('img').attr("src");
                obj.num=$(this).siblings('span').text();
                var arr=JSON.parse(localStorage.getItem('boom'));
                for(var i=0;i<arr.length;i++){
                    if(arr[i].name==obj.name){
                        arr[i].num--;
                        if(arr[i].num==0){
                            arr.splice(i,1);
                        }
                    }
                }
                    localStorage.setItem('boom',JSON.stringify(arr));
            });
            $('.right_add').unbind().click(function () {

                var p_n=$(this).siblings('span').text();

                p_n++;
                $(this).siblings('span').text(p_n);
                ani($(this));
                /*----------------*/

                var  local=localStorage.getItem("boom");
                var obj={};
                obj.name=$(this).parents('li').find('h3').text();
                obj.price=$(this).parents('li').find('i').text();
                obj.img=$(this).parents('li').find('img').attr("src");
                obj.num=$(this).siblings('span').text();
                // if(local){
                    var arr=JSON.parse(local);
                    var ishas=false;
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].name==obj.name){
                            arr[i].num++;
                            ishas=true;
                        }
                    }
                        if(ishas==false){
                            arr.push(obj);
                        }
                    localStorage.setItem('boom',JSON.stringify(arr));
                // }
                // else{
                //     var arr1=[];
                //     arr1.push(obj);
                //     localStorage.setItem("boom",JSON.stringify(arr1));
                // }

                /*----------------*/
            });

        });

        function ani(ta) {
            //动画算子
            if(istru){
                clu.remove();
            }
            istru=true;
            var that=ta.parents('li').children('img');
            var icon=that.clone().css("animationPlayState","running").addClass("cl_img").insertBefore(that);
            // that.before(icon);
            clu=icon;
            ta.parents('li').css("background","pink");
            setTimeout(function () {
                ta.parents('li').css("background","#fff")
            },100);
        }


    }
}


