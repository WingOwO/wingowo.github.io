var opt;
var tp;

var navtop;
var myNavbar;

var t0 = "<h1>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a</h1>";
var t1 = "<h1>b<br>b<br>b<br>b<br>b<br>b<br>b<br>b<br>b<br>b<br>b<br>b<br>b<br>b<br>b<br>b</h1>";

window.onload = function () {

    myNavbar = $("#myNavbar");
    
    navtop = myNavbar.offset().top;

    opt = {
        container:'bg_Canvas',//容器ID
        url:'img/bg_360_0.jpg',
        widthSegments: 60,//水平切段数
        heightSegments: 20,//垂直切段数（值小粗糙速度快，值大精细速度慢）
        pRadius: 1000,//全景球的半径，推荐使用默认值
        minFocalLength: 6,//镜头最a小拉近距离
        maxFocalLength: 6,//镜头最大拉近距离
    }
    tp = new tpanorama(opt);
    tp.init();

    $("#change").html(t0);

    $("#main").click(function(){
        removeActive();
        $("#main").addClass("active");
        $("#change").html(t0);
    });

    $("#index").click(function(){
        removeActive();
        $("#index").addClass("active");
        $("#change").html(t1);
    });


}


$(window).scroll(function () {
    var y = myNavbar.offset().top;
    var visibleTop = window.scrollY;
    if(y < visibleTop){
        myNavbar.addClass("fixed-top bg-dark");
    } else if (visibleTop < navtop){
        myNavbar.removeClass("fixed-top bg-dark");
    }
})

function removeActive() {
    $("#main").removeClass("active");
    $("#index").removeClass("active");
}