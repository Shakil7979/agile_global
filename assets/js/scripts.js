$(document).ready(function(){
	// Mobile Menu
	// $('.logo a i').click(function(){
	// 	$('.menu ul').slideToggle(1000);

	// 	return false
	// }); 

	$('.header_area').hover(
        function() {
            // Mouse enter - add class
            $(this).addClass('header_white');
        },
        function() {
            // Mouse leave - remove class
            $(this).removeClass('header_white');
        }
    );

	// Carousel
	$('.slider_carousel').owlCarousel({
		items:1,
		loop:true,
		nav: false,
		dots:false,
		autoplay:true,
	});





});