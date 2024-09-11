$(document).ready(function(){  

	// Carousel
    $('.slider_carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: false,
        // autoplay: true, 
        animateIn: 'fadeIn',   // Optional, for fade effect
        animateOut: 'fadeOut', // Optional, for fade effect
        onTranslate: function(event) {
            // Reset animation by moving .slider_items out of view
            $('.slider_items').css({
                'opacity': '0',
                'transform': 'translateX(-100px)',
                'transition': 'none'
            });
        },
        onTranslated: function(event) {
            // Animate .slider_items back into view
            $('.slider_items').css({
                'opacity': '1',
                'transform': 'translateX(0)',
                'transition': 'all 1.5s ease' // Adjust the speed as needed
            });
        }
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




$(document).ready(function() {
    let currentMenu = null; // Track the currently open menu

    // Menu link click event
    $('.menu ul li a').click(function(event) {
        const $icon = $(this).find('i'); // Get the icon inside the clicked link
        const menuText = $(this).text().trim().toLowerCase().replace(/\s+/g, '-'); // Get the menu text and format it
        const $dropdown = $(`.drop_menu_main[data-menu="${menuText}"]`); // Find the corresponding dropdown based on menu text

        if (currentMenu === menuText) {
            // If the same menu is clicked, hide the dropdown and reset everything
            $('.header_area').removeClass('header_white');
            $dropdown.slideUp(); // Hide the clicked dropdown
            $icon.css('transform', 'rotate(0deg)'); // Reset icon rotation
            currentMenu = null; // Reset current menu
        } else {
            // If a different menu is clicked, show corresponding dropdown, add class, and rotate icon
            $('.header_area').addClass('header_white');
            $('.drop_menu_main').stop(true, true).slideUp(); // Hide any open dropdown
            $('.menu ul li a i').css('transform', 'rotate(0deg)'); // Reset all icons
            $dropdown.stop(true, true).slideDown(); // Show the clicked dropdown
            $icon.css('transform', 'rotate(180deg)'); // Rotate the icon
            currentMenu = menuText; // Set the current menu to this one
        }

        event.stopPropagation(); // Prevent click event from bubbling up
        return false; // Prevent default action
    });

    // Hover event for header_area
    $('.header_area').hover(
        function() {
            if (!currentMenu) {
                $(this).addClass('header_white');
            }
        },
        function() {
            if (!currentMenu) {
                $(this).removeClass('header_white');
            }
        }
    );

    // Click outside of '.header_area' or '.menu' to hide dropdown and remove 'header_white'
    $(document).click(function(event) {
        if (!$(event.target).closest('.header_area, .menu').length) {
            $('.header_area').removeClass('header_white');
            $('.drop_menu_main').slideUp(); // Hide all dropdowns with animation
            $('.menu ul li a i').css('transform', 'rotate(0deg)'); // Reset all icons
            currentMenu = null; // Reset the current menu
        }
    });
});


$(document).ready(function() {
    function checkWidth() {
        if ($(window).width() < 991) {
            $('.header_area').addClass('header_white');
        } else {
            $('.header_area').removeClass('header_white');
        }
    }

    // Check width on page load
    checkWidth();

    // Check width on window resize
    $(window).resize(function() {
        checkWidth();
    });
});




// Mobile Menu Icon
$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
		$('.mobiler_for_menu').slideToggle();
	});
});
