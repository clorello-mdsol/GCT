// navigation
$('#navStar').show();

var starPos = $('#link'+activePage).position().left + ($('#link'+activePage).width()/2) - 10;
$('#navStar').css('left',starPos);

$('[id^="link"]').mouseover(function(){
	num = $(this).attr('id').split('link')[1];
	
	if(num != activePage){
		$(this).children('a').stop().animate({'color':'#a5c528'},400);
		$('#link'+activePage).stop().animate({'color':'#301306'},400);
	
		starPos = $('#link'+num).position().left + ($('#link'+num).width()/2) - 10;
		$('#navStar').stop().animate({'left':starPos}, 800, 'easeInOutExpo');
	}
});
$('[id^="link"]').mouseout(function(){
	$(this).children('a').stop().animate({'color':'#301306'},400);
	$('#link'+activePage).stop().animate({'color':'#a5c528'},400);
	
	starPos = $('#link'+activePage).position().left + ($('#link'+activePage).width()/2) - 10;
	$('#navStar').stop().animate({'left':starPos}, 800, 'easeInOutExpo');
});