$(function() {
	
	$(".hamburger").on('click.menuENS', function(event) {
		event.preventDefault();
		$(this).toggleClass("is-active");
		$("body").toggleClass("menu_opened");

		/* Act on the event */
	});



})
