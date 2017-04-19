/**
 * Created by YZTC on 2017/4/17.
 */
define(["text!../../com/shopcar/shopcar.html","css!../../com/shopcar/shopcar.css"],function (html) {
    return{
        run:function () {
            $('.main').html(html);
            rt();
        }
    }
});
function rt() {
    var arr=JSON.parse(localStorage.getItem('boom'));
    for(var i=0;i<arr.length;i++){
        var liobj=$('<li><img><p></p><p></p><div class="pan"><code>-</code><b></b><code>+</code></div></li>');
        liobj.find('img').attr("src",arr[i].img);
        liobj.find('p').eq(0).text(arr[i].name);
        liobj.find('p').eq(1).text(arr[i].price);
        liobj.find('b').text(arr[i].num);
        $('.list').append(liobj);
        (function (liobj,i) {
            liobj.find('code:eq(0)').click(function () {//左减少
                var n=$(this).siblings('b').text();
                n--;
                if(n==0){
                    $(this).parents('li').remove();
                    arr=_.without(arr,arr[i]);
                    localStorage.boom=JSON.stringify(arr);
                    // _/without(数组，对象值)//删除数组
                }
                if(n>0){
                    $(this).siblings('b').text(n);
                    arr[i].num--;
                    localStorage.boom=JSON.stringify(arr);
                }
            });
            liobj.find('code:eq(1)').click(function () {//右加
                var n=$(this).siblings('b').text();
                n++;
                $(this).siblings('b').text(n);
                arr[i].num++;
                localStorage.boom=JSON.stringify(arr);
            });

        })(liobj,i);

    }
$('button').click(function () {
    $('.list').empty();
    localStorage.clear();
})


}
