var backButton = '<span class="slick-prev-custom slick-arrow-custom"><svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none"><circle cx="24.2637" cy="24.2637" r="23.7305" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 48.5273 48.5273)" stroke="#151B25" stroke-width="1.06654"/><path d="M13.4876 24.3741C13.2794 24.1659 13.2794 23.8282 13.4876 23.62L16.8813 20.2263C17.0896 20.018 17.4272 20.018 17.6355 20.2263C17.8437 20.4345 17.8437 20.7722 17.6355 20.9804L14.6188 23.9971L17.6355 27.0137C17.8437 27.2219 17.8437 27.5596 17.6355 27.7678C17.4272 27.9761 17.0896 27.9761 16.8813 27.7678L13.4876 24.3741ZM34.1289 24.5303L13.8647 24.5303L13.8647 23.4638L34.1289 23.4638L34.1289 24.5303Z" fill="#151B25"/></svg></span>';
var nextButton = '<span class="slick-next-custom slick-arrow-custom"><svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none"><circle cx="24.2637" cy="24.2636" r="24.2637" transform="rotate(-90 24.2637 24.2636)" fill="#F18A2E"/><path d="M35.0397 24.3741C35.248 24.1659 35.248 23.8282 35.0397 23.62L31.646 20.2263C31.4378 20.018 31.1001 20.018 30.8919 20.2263C30.6836 20.4345 30.6836 20.7722 30.8919 20.9804L33.9085 23.9971L30.8919 27.0137C30.6836 27.2219 30.6836 27.5596 30.8919 27.7678C31.1001 27.9761 31.4378 27.9761 31.646 27.7678L35.0397 24.3741ZM14.3984 24.5303L34.6627 24.5303L34.6627 23.4638L14.3984 23.4638L14.3984 24.5303Z" fill="#151B25"/></svg></span>';
var posterbackButton = '<span class="slick-prev-custom slick-arrow-custom"><svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none"><circle cx="24.2637" cy="24.2637" r="23.7305" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 48.5273 48.5273)" fill="#F18A2E"/><path d="M13.4876 24.3741C13.2794 24.1659 13.2794 23.8282 13.4876 23.62L16.8813 20.2263C17.0896 20.018 17.4272 20.018 17.6355 20.2263C17.8437 20.4345 17.8437 20.7722 17.6355 20.9804L14.6188 23.9971L17.6355 27.0137C17.8437 27.2219 17.8437 27.5596 17.6355 27.7678C17.4272 27.9761 17.0896 27.9761 16.8813 27.7678L13.4876 24.3741ZM34.1289 24.5303L13.8647 24.5303L13.8647 23.4638L34.1289 23.4638L34.1289 24.5303Z" fill="#151B25"/></svg></span>';
var posternextButton = '<span class="slick-next-custom slick-arrow-custom"><svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none"><circle cx="24.2637" cy="24.2636" r="24.2637" transform="rotate(-90 24.2637 24.2636)" fill="#F18A2E"/><path d="M35.0397 24.3741C35.248 24.1659 35.248 23.8282 35.0397 23.62L31.646 20.2263C31.4378 20.018 31.1001 20.018 30.8919 20.2263C30.6836 20.4345 30.6836 20.7722 30.8919 20.9804L33.9085 23.9971L30.8919 27.0137C30.6836 27.2219 30.6836 27.5596 30.8919 27.7678C31.1001 27.9761 31.4378 27.9761 31.646 27.7678L35.0397 24.3741ZM14.3984 24.5303L34.6627 24.5303L34.6627 23.4638L14.3984 23.4638L14.3984 24.5303Z" fill="#151B25"/></svg></span>';

function youmaylikeslider() {    
$(".you-may-like-slider").slick({
    centerMode: false,
    centerPadding: "0",
    slidesToShow: 4,
    focusOnSelect: false,
    dots: false,
    arrows: true,
    // appendArrows: $('.slick-slider-nav'),
    adaptiveHeight: false,
    infinite: true,
    autoplay: true,
    touchThreshold: 100,
    rows: 0,
    prevArrow: posterbackButton,
    nextArrow: posternextButton,
    responsive: [
        { breakpoint: 769, settings: { centerMode: false, centerPadding: "0", slidesToShow: 2 } },
        { breakpoint: 480, settings: { centerMode: false, centerPadding: "0", slidesToShow: 1 } },
    ],
}); 
}
youmaylikeslider(), 
document.addEventListener("shopify:section:load", youmaylikeslider);
function quoteSlider() {    
$(".quote_slider").slick({
    centerMode: false,
    centerPadding: "0",
    slidesToShow: 1,
    focusOnSelect: false,
    dots: false,
    arrows: true,
    appendArrows: $('.quote-slider-nav'),
    adaptiveHeight: false,
    infinite: false,
    touchThreshold: 100,
    rows: 0,
    autoplay: true,
    prevArrow: backButton,
    nextArrow: nextButton,
    responsive: [
        { breakpoint: 769, settings: { centerMode: false, centerPadding: "0", slidesToShow: 1 } },
        { breakpoint: 480, settings: { centerMode: false, centerPadding: "0", slidesToShow: 1 } },
    ],
}); 
}
quoteSlider(), 
document.addEventListener("shopify:section:load", quoteSlider);

function testimonialSlider() { 
$('.testimonial_slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical:true,
    centerMode: true,
    centerPadding: "0",
    dots: false,
    arrows: true,
    appendArrows: $('.testimonial-slider-nav'),
    prevArrow: backButton,
    nextArrow: nextButton,
    focusOnSelect: true,
    rows: 0,
    touchThreshold: 100,
    verticalSwiping:true,
    draggable:true,
    autoplay: false,
    responsive: [
        { breakpoint: 990, settings: { vertical: false, verticalSwiping:false, slidesToShow: 1, adaptiveHeight: true } },
        { breakpoint: 768, settings: { vertical: false, verticalSwiping:false, slidesToShow: 1,  adaptiveHeight: true } },
        { breakpoint: 580, settings: { vertical: false, verticalSwiping:false, slidesToShow: 1,  adaptiveHeight: true } },
        { breakpoint: 380, settings: { vertical: false, verticalSwiping:false, slidesToShow: 1,  adaptiveHeight: true } },
    ]
});
}
testimonialSlider(), 
document.addEventListener("shopify:section:load", testimonialSlider);


$(document).ready(function(){
  $('.product_image_slider').each(function(){
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000
    })
  });
});
// .on('setPosition', function (event, slick) {
// 	slick.$slides.css('height', slick.$slideTrack.height() + 'px');
//     });
  document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.homepage-collection__video');
    const buttons = document.querySelectorAll('.video-button');

    // Function to pause all other videos
    function pauseAllVideos(currentVideo) {
      videos.forEach(video => {
        if (video !== currentVideo && !video.paused) {
          video.pause();
          video.currentTime = 0; // Reset to the beginning
          video.classList.add('video_controls'); // Hide controls
          video.load(); // Reload to show poster
        }
      });
    }

    // Loop through each button element
    buttons.forEach((button, index) => {
      button.addEventListener('click', function() {
        const video = videos[index];
        pauseAllVideos(video); // Pause all other videos
        video.play(); // Play the corresponding video
        video.classList.remove('video_controls'); // Show controls when the video plays
        button.style.display = 'none'; // Hide the button when the video starts playing
      });
    });

    // Loop through each video element
    videos.forEach((video, index) => {
      const button = buttons[index];

      // Add event listener for 'play' event
      video.addEventListener('play', function() {
        video.classList.remove('video_controls'); // Show controls when the video plays
        button.style.display = 'none'; // Hide the button when the video starts playing
      });

      // Add event listener for 'pause' event
      video.addEventListener('pause', function() {
        video.classList.add('video_controls'); // Hide controls when the video is paused
        button.style.display = 'block'; // Show the button when the video is paused
      });
    });
  });

$('.home-faq-heading h3').click(function(){
    var actve = $(this).parents('.home-faq-sec-block').hasClass('active');
    if(actve == true){
        $(this).parents('.home-faq-sec-block').removeClass('active');
    }else{
        $('.home-faq-heading h3').parents('.home-faq-sec-block').removeClass('active');
          $(this).parents('.home-faq-sec-block').addClass('active');
    }
});

$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical:true,
    asNavFor: '.slider-for',
    dots: false,
    focusOnSelect: true,
    verticalSwiping:true,
    responsive: [
    {
        breakpoint: 992,
        settings: {
          vertical: false,
        }
    },
    {
      breakpoint: 768,
      settings: {
        vertical: false,
      }
    },
    {
      breakpoint: 580,
      settings: {
        vertical: false,
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 380,
      settings: {
        vertical: false,
        slidesToShow: 2,
      }
    }
    ]
});
$(document).ready(function() {
    $('.card').each(function() {
        var $card = $(this); 
        var $images = $card.find('.product_custom_images span');
        $images.each(function() {
            var $image = $(this);
            var dataAlt = $image.attr('data-alt'); 

            if (dataAlt == 'collection_page') {
                var collectionImageSrc = $image.attr('data-src');
                console.log(collectionImageSrc);
                var $featuredImage = $card.find('.custom_product-featured_image'); 
        if ($featuredImage.length && collectionImageSrc) {
            $featuredImage.attr('src', collectionImageSrc); 
        }
            }
        });
    });
});
$(document).ready(function() {
    $('.product_col').each(function() {
        var $card = $(this);
        var $images = $card.find('.product_custom_images span');
        $images.each(function() {
            var $image = $(this);
            var dataAlt = $image.attr('data-alt');

            if (dataAlt == 'home_image') {
                var collectionImageSrc = $image.attr('data-src');
                console.log(collectionImageSrc);
                var $featuredImage = $card.find('.home-product-image');
        if ($featuredImage.length && collectionImageSrc) {
            $featuredImage.attr('src', collectionImageSrc);
        }
            }
        });
    });
});
$(window).on('scroll', function() {
    $('.flashcard').each(function() {
        if ($(this).isInViewport() && !$(this).hasClass('active')) { // Check if the class is not already added
            $(this).addClass('active'); // Replace 'your-class-name' with the class you want to add

            var element = $(this);
            setTimeout(function() {
                element.removeClass('active');
            }, 1000); // 1000 milliseconds = 1 second
        }
    });
});

// Helper function to check if element is in the viewport
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    
    return elementBottom > viewportTop && elementTop < viewportBottom;
};




///////////////////for testimonial link///////////////////////////////////////
document.querySelector('a[href="#testimonial"]').addEventListener('click', function (e) {
    const testimonialSection = document.querySelector('#testimonial');

    if (!testimonialSection) {
        e.preventDefault(); 
        window.location.href = "/#testimonial"; 
    }
});

document.querySelector('a[href="#howitworks"]').addEventListener('click', function (e) {
    const howitworksSection = document.querySelector('#howitworks');

    if (howitworksSection) {
        e.preventDefault(); 
        window.location.href = "/#howitworks"; 
        console.log("test");
    }
});




function manageSlickSlider1() {
    const windowWidth = $(window).width();

    if (windowWidth <= 480) {
        // Initialize the slider for mobile devices (1 slide)
        if (!$('.custom-items').hasClass('slick-initialized')) {
            $('.custom-items').slick({
                dots: false,
                infinite: false,
                slidesToShow: 1,  // Show 1 slide on mobile
                slidesToScroll: 1,
                arrows: true,
                appendArrows: $('.quote-slider-nav'),
                prevArrow: backButton,
                nextArrow: nextButton
            });
        }
    } else if (windowWidth <= 749) {
        // Initialize the slider for tablets (2 slides)
        if (!$('.custom-items').hasClass('slick-initialized')) {
            $('.custom-items').slick({
                dots: false,
                infinite: false,
                slidesToShow: 2,  // Show 2 slides on larger mobile
                slidesToScroll: 1,
                arrows: true,
                appendArrows: $('.quote-slider-nav'),
                prevArrow: backButton,
                nextArrow: nextButton,
               responsive: [
                { breakpoint: 480, settings: {slidesToShow: 1 } },
            ],
            });
        }
    } else {
        // Unslick the slider for desktop view
        if ($('.custom-items').hasClass('slick-initialized')) {
            $('.custom-items').slick('unslick');
        }
    }
}

$(document).ready(function() {
    manageSlickSlider1(); // Initial check for the slider

    // Run on window resize
    $(window).on('resize', function() {
        manageSlickSlider1();
    });
});




function manageSlickSlider() {
    const windowWidth = $(window).width();

    // First slider: left to right
    if (windowWidth <= 767) {
        if (!$('.slider-one').hasClass('slick-initialized')) {
            $('.slider-one').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 0, // Continuously scroll without pause
                speed: 3000, // Slow down the transition speed for smoothness
                pauseOnHover: false, // No pausing on hover
                cssEase: 'linear', // Linear easing for smooth scrolling
                infinite: true, // Loop the slider infinitely
                swipe: false, // Disable swipe for autoplay smoothness
                responsive: [
                    {
                        breakpoint: 480, // For window widths <= 480px
                        settings: { 
                            slidesToShow: 2 
                        }
                    }
                ]
            });
        }
    } else {
        if ($('.slider-one').hasClass('slick-initialized')) {
            $('.slider-one').slick('unslick');
        }
    }

    // Second slider: right to left
    if (windowWidth <= 767) {
        if (!$('.slider-two').hasClass('slick-initialized')) {
            $('.slider-two').slick({
               slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 0, // Continuously scroll without pause
                speed: 3000, // Slow down the transition speed for smoothness
                pauseOnHover: false,
                cssEase: 'linear',
                infinite: true,
                swipe: false, // Disable swipe for autoplay smoothness
                rtl: true, // Simulate right-to-left scrolling
                responsive: [
                    {
                        breakpoint: 480, // For window widths <= 480px
                        settings: { 
                            slidesToShow: 2 
                        }
                    }
                ]
            });
        }
    } else {
        if ($('.slider-two').hasClass('slick-initialized')) {
            $('.slider-two').slick('unslick');
        }
    }
 setTimeout(function() {
        if ($('.slider-one').hasClass('slick-initialized')) {
            $('.slider-one').slick('setPosition');
        }
        if ($('.slider-two').hasClass('slick-initialized')) {
            $('.slider-two').slick('setPosition');
        }
    }, 10);
}

$(document).ready(function() {
    manageSlickSlider(); // Initial call when document is ready

    // Re-run the function on window resize
    $(window).on('resize', function() {
        manageSlickSlider();
      
    // Set position after resize for smooth transition
   
    });
});

// JavaScript to close dropdown menu when clicking outside
$(document).ready(function() {
  $(document).on('click', function(event) {
    // Close all dropdowns when clicking outside
    const $target = $(event.target);

    if (!$target.closest('#Details-HeaderMenu-7').length) {
      $('#Details-HeaderMenu-7[open]').removeAttr('open');
    }
  });

  // Prevent closing dropdown when clicking inside the dropdown
  $('#Details-HeaderMenu-7').on('click', function(event) {
    event.stopPropagation();
  });
});



      