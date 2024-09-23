$(document).ready(function(){  

    // $('.slide_down_icon').on('click', function(event) {
    //     event.preventDefault();
    //     $('.overview_area').slideToggle('slow');
    // });

    $('.slide_down_icon a').on('click', function(event) {
        event.preventDefault(); 

        var target = $($(this).attr('href'));  
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top 
            }, 1000); 
        }
    });

    $('.btn_black_contact').on('click',function(){
        $('.btn_first').hide();
        $('.btn_next').show();
        $('.right_form_contact').css({'right':'12px'});
    });

    $('.contact_next_btn .btn_black_contact').on('click',function(){
        $('.btn_next').hide();
        $('.btn_first').show();
        $('.right_form_contact').css({'right':'-59px'});
    });
 

    // $('.btn_red_contact, .form_hover').hover(
    //     function() { 
    //         $('.form_hover').stop().animate({
    //             right: '55px'
    //         }, 500);  
    //     },
    //     function() { 
    //         $('.form_hover').stop().animate({
    //             right: '-600px'
    //         }, 500);
    //     }
    // );
    // $('.close_sk_form').on('click',function(){ 
    //         $('.form_hover').css({'right':'-600'})
    // })

	// Carousel
    $('.slider_carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true, 
        animateIn: 'fadeIn',   
        animateOut: 'fadeOut', 
        onTranslate: function(event) {
            $('.slider_items').css({
                'opacity': '0',
                'transform': 'translateX(-100px)',
                'transition': 'none'
            });
        },
        onTranslated: function(event) {
            $('.slider_items').css({
                'opacity': '1',
                'transform': 'translateX(0)',
                'transition': 'all 1.5s ease' 
            });
        }
    });

 

	// Made Carousel
	$('.made_carousel').owlCarousel({
		items:1,
		loop:true,
		nav: true,
		dots:true,
		autoplay:true,
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




// Mobile menu and dropdown both script here 

$(document).ready(function() {
    let menuOpen = false; // Track the state of the mobile menu

    // Toggle the mobile menu
    $('#nav-icon1, #nav-icon2, #nav-icon3, #nav-icon4').click(function() {
        $(this).toggleClass('open');
        $('.mobiler_for_menu').slideToggle();

        // Close any open dropdowns if the menu is being toggled
        if (menuOpen) {
            $('.drop_menu_main').removeClass('active').css('right', '-300px');
        }
        menuOpen = !menuOpen;
    });

    // Handle dropdown menu clicks
    $('.mobiler_for_menu .mobile_menu_child ul li a').click(function(e) {
        e.preventDefault(); // Prevent default link behavior

        const menuId = $(this).text().trim().toLowerCase().replace(/\s+/g, '-');
        const $dropdown = $('.drop_menu_main[data-menu="' + menuId + '"]');

        // Close all dropdowns except the current one
        $('.drop_menu_main').not($dropdown).removeClass('active').css('right', '-300px');

        // Toggle the selected dropdown
        if ($dropdown.hasClass('active')) {
            $dropdown.removeClass('active').css('right', '-300px');
        } else {
            $dropdown.addClass('active').css('right', '0'); // Slide in from the right
        }
    });

    // Handle the "back" button click
    $('.drop_back').click(function(e) {
        e.preventDefault(); // Prevent default link behavior

        // Hide the currently active dropdown
        $('.drop_menu_main.active').removeClass('active').css('right', '-300px');
    });

    // Close mobile menu and dropdowns when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.mobiler_for_menu, #nav-icon1, #nav-icon2, #nav-icon3, #nav-icon4, .drop_menu_main').length) {
            $('.mobiler_for_menu').slideUp();
            $('#nav-icon1, #nav-icon2, #nav-icon3, #nav-icon4').removeClass('open');
            $('.drop_menu_main').removeClass('active').css('right', '-300px');
            menuOpen = false;
        }
    });
});



// acordion for footer 
$(document).ready(function() {
    // Handle accordion effect for mobile menu items
    $('.click_footer_mobiless').click(function(e) {
        e.preventDefault(); // Prevent default link behavior

        const $icon = $(this).find('i'); // Get the icon inside the clicked link
        const $nestedUl = $(this).siblings('ul'); // Get the nested ul element
        
        // Calculate the full height of the nested ul
        const contentHeight = $nestedUl[0].scrollHeight;

        if ($nestedUl.hasClass('open')) {
            $nestedUl.removeClass('open').css('height', contentHeight).slideUp(300, function() {
                $(this).css('height', ''); // Clear height after animation
            });
            $icon.removeClass('fa-minus').addClass('fa-plus'); // Change icon to plus
        } else {
            // Ensure other open accordions are closed
            $('.single_mobile_ul ul.open').removeClass('open').css('height', contentHeight).slideUp(300, function() {
                $(this).css('height', ''); // Clear height after animation
            });
            $('.single_mobile_ul .fa-minus').removeClass('fa-minus').addClass('fa-plus');
            
            $nestedUl.addClass('open').css('height', 0).slideDown(300, function() {
                $(this).css('height', ''); // Clear height after animation
            });
            $icon.removeClass('fa-plus').addClass('fa-minus'); // Change icon to minus
        }
    });
});


$(window).on('load', function() {
    // Hide the preloader once the page is fully loaded
    $('#preloader').fadeOut('slow', function() {
        $(this).remove();
    });
});






$(document).ready(function() {
    var isClosed = true;  
 
    $('.btn_red_contact').on('click', function() {
        if (isClosed) {
            $('.form_hover').stop().animate({ right: '55px' }, 500);
        } else {
            $('.form_hover').stop().animate({ right: '-600px' }, 500);
        }
        isClosed = !isClosed;   
    });
 
    $('.btn_red_contact, .form_hover').on('mouseenter', function() {
        if (isClosed) {
            $('.form_hover').stop().animate({ right: '55px' }, 500);
        }
    });
 
    $('.btn_red_contact, .form_hover').on('mouseleave', function() {
        if (isClosed) {
            $('.form_hover').stop().animate({ right: '-600px' }, 500);
        }
    });
 
    $('.close_sk_form').on('click', function() {
        isClosed = true;  
        $('.form_hover').stop().animate({ right: '-600px' }, 500);
    });
});

