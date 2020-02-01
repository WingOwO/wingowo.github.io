var opt;
var tp;

var navtop;
var myNavbar;

//console.log(window.location.pathname.substring(1));

var showFrame;
var frame;

window.onload = function () {
//////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////
    myNavbar = $("#myNavbar");
    navtop = myNavbar.offset().top;
//////////////////////////////////////////////////////////////////////////////////////

    showFrame = $("#showFrame");
    frame = $.ajax({url:"html/blogTitleFrame.html",async:false}).responseText;

    showIndex();

}


function showIndex()
{
    showFrame.html("");
    var str = $.ajax({url:"blog/index.txt",async:false}).responseText;
    var list = new Array();
    list = str.split("\n");
    for (i=0;i<list.length;i++)
    {
        if(list != "" || list != "\n")
        {
            showFrame.append("<br>");
            showFrame.append(frame);
            var title = list[i].split(".")[0];
            showFrame.children("#frame").eq(i).append(title);
            showFrame.append("<br>");
        }
    }
    $(".blogTitle").click(function ()
    {
        showFrame.html("");
        addBackButton();
        var blog = "blog/" + $(this).html() + ".html";
        var str = $.ajax({url:blog,async:false}).responseText;
        showFrame.append(str);
        addBackButton();
    });
}

function addBackButton()
{
    showFrame.append("<br>");
    showFrame.append("<button type=\"button\" class=\"btn btn-dark\" onclick=\"showIndex()\"><-Back</button>");
    showFrame.append("<br>");
}

/*
$(window).scroll(function () {
    var y = myNavbar.offset().top;
    var visibleTop = window.scrollY;
    if(y < visibleTop){
        myNavbar.addClass("fixed-top bg-dark");
    } else if (visibleTop < navtop){
        myNavbar.removeClass("fixed-top bg-dark");
    }
});


*/
