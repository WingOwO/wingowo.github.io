var navtop;

window.onload = function() 
{
	 navtop = $("#f_nav").offset().top;
}

 $(window).scroll(function () {
 	var y = $("#f_nav").offset().top;
 	var visibleTop = window.scrollY;
	if(y < visibleTop){
		$("#f_nav").addClass("fixed-top bg-dark");
	} else if (visibleTop < navtop){
		$("#f_nav").removeClass("fixed-top bg-dark");
	}
})
