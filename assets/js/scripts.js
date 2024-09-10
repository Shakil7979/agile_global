$(document).ready(function(){ 

	// $('.header_area').hover(
    //     function() { 
    //         $(this).addClass('header_white');
    //     },
    //     function() { 
    //         $(this).removeClass('header_white');
    //     }
    // );

	// Carousel
	$('.slider_carousel').owlCarousel({
		items:1,
		loop:true,
		nav: false,
		dots:false,
		autoplay:true,
	});

	// Made Carousel
	$('.made_carousel').owlCarousel({
		items:1,
		loop:true,
		nav: true,
		dots:true,
		// autoplay:true,
		navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
	});

	$('.back_to_top').click(function() { 
        $('html, body').animate({ scrollTop: 0 }, 'slow');

		return false;
    });

	// $('.menu ul li a').click(function() { 
    //     $('.header_area').addClass('header_white');
         
    //     $('.drop_menu_main').show();

	// 	return false;
    // });
  
    let isClicked = false; // Flag to check if the menu is clicked

    // Menu link click event
    $('.menu ul li a.who_we_are').click(function(event) {
        const $icon = $(this).find('i'); // Get the icon inside the clicked link

        if (isClicked) {
            // If clicked already, hide dropdown, remove class, and reset icon rotation
            $('.header_area').removeClass('header_white');
            $('.drop_menu_main').slideUp(); // Hide dropdown with animation
            $icon.css('transform', 'rotate(0deg)'); // Reset icon rotation
            isClicked = false; // Reset the click flag
        } else {
            // If not clicked, show dropdown, add class, and rotate icon
            $('.header_area').addClass('header_white');
            $('.drop_menu_main').stop(true, true).slideDown(); // Show dropdown with animation
            $icon.css('transform', 'rotate(180deg)'); // Rotate the icon
            isClicked = true; // Set the flag to true after clicking
        }

        event.stopPropagation(); // Prevent click event from bubbling up
        return false; // Prevent default action
    });

    // Hover event for header_area
    $('.header_area').hover(
        function() {
            if (!isClicked) {
                $(this).addClass('header_white');
            }
        },
        function() {
            if (!isClicked) {
                $(this).removeClass('header_white');
            }
        }
    );

    // Click outside of '.header_area' or '.menu' to hide dropdown and remove 'header_white'
    $(document).click(function(event) {
        if (!$(event.target).closest('.header_area, .menu').length) {
            $('.header_area').removeClass('header_white');
            $('.drop_menu_main').slideUp(); // Hide dropdown with animation
            
            // Reset all icons rotation
            $('.menu ul li a i').css('transform', 'rotate(0deg)');
            isClicked = false; // Reset the click flag
        }
    });
});


$(document).ready(function() {
    $('.drop_middle_menu > ul > li > a').click(function(event) {
        // Prevent default action
        event.preventDefault();
        
        const $submenu = $(this).siblings('.sub-menu'); // Find the sibling sub-menu
        const $icon = $(this).find('i'); // Find the icon

        // Hide all other sub-menus and reset icon rotation
        $('.drop_middle_menu .sub-menu').not($submenu).slideUp();
        $('.drop_middle_menu > ul > li > a i').not($icon).css('transform', 'rotate(0deg)');

        if ($submenu.is(':visible')) {
            // If sub-menu is already visible, hide it
            $submenu.slideUp();
            $icon.css('transform', 'rotate(0deg)'); // Reset icon rotation
        } else {
            // Show the clicked sub-menu and rotate the icon
            $submenu.slideDown();
            $icon.css('transform', 'rotate(180deg)');
        }
    });

    // Click outside to hide sub-menu
    $(document).click(function(event) {
        if (!$(event.target).closest('.drop_middle_menu').length) {
            $('.sub-menu').slideUp(); // Hide all sub-menus
            $('.drop_middle_menu > ul > li > a i').css('transform', 'rotate(0deg)'); // Reset all icons
        }
    });
});


$(document).ready(function() {
    function animateCounter(element, endValue, duration) {
        $({ countNum: 0 }).animate({ countNum: endValue }, {
            duration: duration,
            easing: 'swing',
            step: function() {
                $(element).text(Math.ceil(this.countNum));
            },
            complete: function() {
                $(element).text(this.countNum);
            }
        });
    }

    function handleCounterAnimation(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $element = $(entry.target).find('h4');
                if ($element.data('animated')) return; // Check if already animated
                const endValue = parseInt($element.text().replace(/,/g, ''), 10); // Get end value
                $element.text('0'); // Start from 0
                animateCounter($element[0], endValue, 2000); // Animate to the end value in 2000ms
                $element.data('animated', true); // Mark as animated
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }

    const observer = new IntersectionObserver(handleCounterAnimation, {
        threshold: 0.5 // Adjust threshold as needed
    });

    // Observe each `.overview_item` individually
    $('.overview_item').each(function() {
        observer.observe(this);
    });
});
