/* HOMEPAGE */


// arrange slides based on window size

var screenW;
var centerPos;

$(window).resize(function(){

	screenW = $('body').width();
	centerBG = (screenW-1478)/2;

	$('#slideContents').css('left',centerBG);

});

$(window).resize();






// load images

var bgImage = new Image();

function openPage(){
$(bgImage).load(function(){
	$('#slideContents').animate({opacity:0},400, function(){
		$('#slideContents').removeClass('loading');
		$('#slidebg-0').css({'background-image':"url('images/slidebg0.jpg')",'opacity':1});
		$('#slideContents').animate({opacity:1},400);
		$('#navStar').show();
		$('#globalNav').animate({opacity:1},400);
		$('#slideimg-0').delay(0).animate({'left':0}, 1000, 'easeInOutExpo');
		goSlideshow();
	});
}).attr('src','images/slidebg0.jpg');
}





// control slideshow
var active = 0;
var total = 3;
var last;
$('#dot0').css({'opacity':1});

function goSlideshow(){
slideshow = setInterval(function(){
	
	// move main slide off screen
	$('[id^="slidebg-"]').css({'z-index':1});
	$('#slideimg-'+active).stop().animate({'left':-1478}, 800, 'easeInOutExpo');
	$('#dot'+active).css({'opacity':.2});
	
	last = active;
	active++;
	if(active == total){
		active = 0;
	}
	
	// reset slide
	$('#slideimg-'+active).css({'left':1478});
	$('#slidebg-'+last).css({'z-index':2});
	$('#slidebg-'+active).css({'z-index':3,'opacity':0});
	
	// move new slide on screen
	$('#slideimg-'+active).stop().animate({'left':0}, 800, 'easeInOutExpo');
	$('#slidebg-'+active).delay(200).animate({'opacity':1}, 800);
	$('#dot'+active).css({'opacity':1});
	
}, 5000);
}





// dot buttons - go direct to slide

$('[id^="dot"]').each(function(){
	$(this).children('a').click(function(){
		num = $(this).attr('data-num');
		
		if(num!=active){
		clearInterval(slideshow);
		$('[id^="slidebg-"]').css({'z-index':1});
		
		if(num>active){
			dir = 1;
		} else {
			dir = -1;
		}
		
		// move main slide off screen
		$('#slideimg-'+active).stop().animate({'left':-1478*dir}, 800, 'easeInOutExpo');
		$('#dot'+active).css({'opacity':.2});
	
		last = active;
		active = Number(num);
	
		// reset slide
		$('#slideimg-'+active).css({'left':1478*dir});
		$('#slidebg-'+last).css({'z-index':2});
		$('#slidebg-'+active).css({'z-index':3,'opacity':0});
	
		// move new slide on screen
		$('#slideimg-'+active).stop().animate({'left':0}, 800, 'easeInOutExpo');
		$('#slidebg-'+active).delay(200).animate({'opacity':1}, 800);
		$('#dot'+active).css({'opacity':1});
		
		}
	
		return false;
	})
});





// slideshow arrows

$('#arrowRight').click(function(){
	clearInterval(slideshow);
	$('[id^="slidebg-"]').css({'z-index':1});
	
	// move main slide off screen
	$('#slideimg-'+active).stop().animate({'left':-1478}, 800, 'easeInOutExpo');
	$('#dot'+active).css({'opacity':.2});
	
	last = active;
	active++;
	if(active == total){
		active = 0;
	}
	
	// reset slide
	$('#slideimg-'+active).css({'left':1478});
	$('#slidebg-'+last).css({'z-index':2});
	$('#slidebg-'+active).css({'z-index':3,'opacity':0});
	
	// move new slide on screen
	$('#slideimg-'+active).stop().animate({'left':0}, 800, 'easeInOutExpo');
	$('#slidebg-'+active).delay(200).animate({'opacity':1}, 800);
	$('#dot'+active).css({'opacity':1});
	
	return false;
});

$('#arrowLeft').click(function(){
	clearInterval(slideshow);
	$('[id^="slidebg-"]').css({'z-index':1});
	
	// move main slide off screen
	$('#slideimg-'+active).stop().animate({'left':1478}, 800, 'easeInOutExpo');
	$('#dot'+active).css({'opacity':.2});
	
	last = active;
	active--;
	if(active < 0){
		active = total-1;
	}
	
	// reset slide
	$('#slideimg-'+active).css({'left':-1478});
	$('#slidebg-'+last).css({'z-index':2});
	$('#slidebg-'+active).css({'z-index':3,'opacity':0});
	
	// move new slide on screen
	$('#slideimg-'+active).stop().animate({'left':0}, 800, 'easeInOutExpo');
	$('#slidebg-'+active).delay(200).animate({'opacity':1}, 800);
	$('#dot'+active).css({'opacity':1});
	
	return false;
});






// loading images
var i=1;

function loadImages(){

	var tempImg = new Image();
	$(tempImg).load(function(){
		$('#slideimg-'+i).children('img').attr('src','images/slidecontents'+i+'.png');
		i++;
		if(i<total){
			loadImages();
		} else {
			i = 1;
			loadBGs();
		}
	}).attr('src','images/slidecontents'+i+'.png');

}

function loadBGs(){

	var tempImg = new Image();
	$(tempImg).load(function(){
		$('#slidebg-'+i).css('background-image',"url('images/slidebg"+i+".jpg')");
		i++;
		if(i<total){
			loadBGs();
		} else {
			openPage();
		}
	}).attr('src','images/slidebg'+i+'.jpg');

}


// execute once javascript is loaded

$(document).ready(function(){
	$(window).resize();
});

loadImages();