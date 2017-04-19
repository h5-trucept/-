/**
 * Created by YZTC on 2017/4/11.
 */
define(['text!../../com/home/home.html','css!../../com/home/home.css','swiper','underscore'],function (html) {
        return{
            run:function () {
                $('.main').html(html);
            },

            ajax:function () {

                $.getJSON("json/home.json",function (data) {
                    Rimg(data.data);
                    Rmenu(data.data);
                    Rhmenu(data.data);
                    Rguang(data.data);
                    Rshopo(data.data);

                })
            }
        }
});

function Rimg(data) {

    var data=data.act_info[0].act_rows;
        for(var i=0;i<data.length;i++){
       var img= $('<div class="swiper-slide"><img></div>').appendTo('.swiper-wrapper');
            img.find('img').attr("src",data[i].activity.img)
    }
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: 800,
        autoplayDisableOnInteraction: false,
        // 如果需要分页器
        pagination: '.swiper-pagination'


    });
}
function Rmenu(data) {
    var obj = data.act_info[1];
    console.log(obj);
    var arr = _.pluck(_.pluck(obj.act_rows, "activity"), "img");
    var ann = _.pluck(_.pluck(obj.act_rows, "activity"), "name");
    for(var i = 0; i < arr.length;i++) {
        var li= $('<li><img><p></p></li>').appendTo($('.menu_list'));
        li.find('img').prop("src",arr[i]);
        li.find('p').html(ann[i]);
    }

}
function Rhmenu(data) {
    var data=data.act_info[3].act_rows;
    for(var i=0;i<data.length;i++){
        var img= $('<li class="need"><img></li>').appendTo('.menu_hlist');
        img.find('img').attr("src",data[i].activity.img)
    }
}
function Rguang(data) {

    var da=data.act_info[4].act_rows[0].act_rows[0].chead_detail.img;
//  console.log(da);
    $('.guang img').attr("src",da);
    var obj=data.act_info[4].act_rows[1].act_rows;

    for(var i=0;i<obj.length;i++){
        var img= $('<li><img></li>').appendTo('.guangul');
        img.find('img').attr("src",obj[i].cactivity_detail.img)
    }
    var otb=data.act_info[4].act_rows[2].act_rows;
    for(var i=0;i<otb.length;i++){
        var img= $('<li><img><p></p></li>').appendTo('.guangnav');
        img.find('img').attr("src",otb[i].cicons_detail.img);
        img.find('p').html(otb[i].cicons_detail.name);
    }
    var ogg=data.act_info[4].act_rows[3].act_rows;
    for(var i=0;i<ogg.length;i++){
        var img= $('<li><img></li>').appendTo('.guangtav');
        img.find('img').attr("src",ogg[i].activity.img)
    }
}
function Rshopo(data) {
    var da=data.act_info[5].act_rows;
    for(var i=0;i<da.length;i++){
        var div=$('<div class="sake"><div class="shopo_o"><i class="fa fa-square"></i><b></b><span>更多<i class="fa fa-angle-right"></i></span></div><img src="" alt=""><ul class="soke_ul"></ul></div>').appendTo($('.shopo'));
        div.find('b').html(da[i].category_detail.name);
         div.children('img').attr("src",da[i].activity.img);
        div.find('b').css("color","#"+da[i].category_detail.category_color);
        div.find('.fa-square').css("color","#"+da[i].category_detail.category_color);
        var obj=da[i].category_detail.goods;
        for(var j=0;j<obj.length;j++){
           var li= $('<li><div class="li_di"><img><h3></h3><i></i><h5></h5><p><span></span><samp></samp><code>+</code></p></div></li>').appendTo(div.find('ul'));
            li.find('img').attr("src",obj[j].app_mimg);
            li.find('h3').html(obj[j].name);
            if(obj[j].pm_desc==""){
                li.find('i').remove();
            }
            li.find('i').html(obj[j].pm_desc);
            li.find('h5').html(obj[j].specifics);
            li.find('p span').html("￥"+obj[j].price);
            li.find('p samp').html(obj[j].market_price);
        }
    }




    // var div=$('<div class="shopo_o"><i class="fa fa-square"></i><b></b><span>更多<i class="fa fa-angle-right"></i></span></div>').appendTo($('.shopo'))
    // div.find('b').html(da.category_detail.name).css("color","#"+da.category_detail.category_color);
    // $('<img>').attr("src",da.activity.img).appendTo($('.shopo'));
    // var obj=da.category_detail.goods;
    // for(var i=0;i<obj.length;i++){
    //     var img= $('<li><img></li>').appendTo('.guangtav');
    //     img.find('img').attr("src",obj[i].activity.img)
    // }
}