// contact form submission
$('#sendbutton').mouseover(function(){
	$(this).stop().animate({'opacity':0},400);
});
$('#sendbutton').mouseout(function(){
	$(this).stop().animate({'opacity':1},400);
});
$('#sendbutton').click(function(){
	$('#contactForm').submit();
	return false;
});

$('#contactForm').submit(function (){
	validateForm();
	return false;
});
/*
$('#contact-column5 :submit').removeClass('no-js').bind({
  mouseenter: function () {
    $(this).stop(true,true).animate({opacity:0}, 400);
  },
  mouseleave : function () {
    $(this).stop(true,true).animate({opacity:1}, 400);
  },
  focus: function () {
    $(this).stop(true,true).animate({opacity:0}, 400);
  },
  blur : function () {
    $(this).stop(true,true).animate({opacity:1}, 400);
  }
});
*/
var sending = false;

function validateForm(){
	var vNum = 0;
	$('[data-rel="field"]').each(function(){
		if($(this).val() == ""){
			vNum++;
			alert("Please fill in all fields.");
			return false;
		}
	});
	if(vNum==0){
		sendForm();
	}
}

function sendForm(){
	sending = true;
	var name = $('#textfield').val();
	var company = $('#textfield2').val();
	var phone = $('#textfield3').val();
	var email = $('#textfield4').val();
	var message = $('#textarea').val();

	$('#thanks').hide();
	$('#sending').fadeIn('fast');

	$('[data-rel="field"]').animate({'opacity':.3},400);

	$.ajax({
		url: 'scripts/form.php',
		type: 'POST',
		data: 'name=' + name + '&company=' + company + '&phone=' + phone + '&email=' + email + '&message=' + message,

		success: function(result){
			$('#sending').delay(800).fadeOut('slow',function(){
				$('#thanks').fadeIn('slow');

				$('[data-rel="field"]').each(function(){
					$(this).val("");
				});

				$('[data-rel="field"]').animate({'opacity':1},400);

				sending = false;

				//$('#thanks').delay(800).fadeOut('fast');
			});
		}
	});

	return false;
}
