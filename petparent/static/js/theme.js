/* =================================================================
* Template JS
* 
* Template:    Aivo - Multipurpose Portfolio HTML Website Template
* Author:      Themetorium
* URL:         http://themetorium.net
*
================================================================= */


/* Table of Content
====================
# Page transitions
# Smooth scrolling
# Header
# Main menu
# Overlay menu
# Page header
# Parallax scrolling effect
# Element fade out scrolling effect
# jQuery Lazy
# Isotope
# OWL Carousel
# lightGallery
# YTPlayer
# jQuery.dotdotdot
# Counter-Up
# Remove input placeholder on focus
# Sticky share
# uniMail
# Footer
# Scroll to top button
# Miscellaneous
*/


(function ($) {
   'use strict';


   // ===============================================
   // Page transitions / preloader (Animsition)
   // More info: http://git.blivesta.com/animsition/
   // ===============================================

   $(".animsition").animsition({
      inClass: 'fade-in',
      outClass: 'fade-out',
      inDuration: 800,
      outDuration: 500,
      
      linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class*="lg-trigger"])', // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
      loading: true,
      loadingParentElement: 'html', //animsition wrapper element
      loadingClass: 'animsition-loading',
      loadingInner: '', // e.g '<img src="assets/img/loading.svg" />'
      timeout: true,
      timeoutCountdown: 4000,
      onLoadEvent: true,
      browser: ['animation-duration', '-webkit-animation-duration', '-o-animation-duration'], // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser. The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
      
      overlay : false,
      overlayClass : 'animsition-overlay-slide',
      overlayParentElement : 'html',
      transition: function(url){ window.location.href = url; }
   });



   // =========================================================================
   // Smooth scrolling 
   // Note: requires Easing plugin - http://gsgd.co.uk/sandbox/jquery/easing/
   // =========================================================================

   $('.sm-scroll').on("click",function() {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
         if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000, 'easeInOutExpo');
            return false;
         }
      }
   });



   // ===================================================
   // Header
   // ===================================================

   // if #header contains class "header-transparent" add class "header-transparent-on" to <pody>.
   if ($('#header').hasClass('header-transparent')) {
      $('body').addClass('header-transparent-on');
   }

   // if #header contains class "menu-align-center" add class "menu-align-center-on" to <pody>.
   if ($('#header').hasClass('menu-align-center')) {
      $('body').addClass('menu-align-center-on');
   }


   // Hide header on scroll down, show on scroll up
   // More info: https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
   // ===================================================
   var didScroll;
   var lastScrollTop = 0;
   var delta = 120;
   var navbarHeight = $('.header-show-hide-on-scroll').outerHeight();

   $(window).on("scroll",function(event) {
      didScroll = true;
   });

   setInterval(function() {
      if (didScroll) {
         hasScrolled();
         didScroll = false;
      }
   }, 50);

   function hasScrolled() {
      var st = $(window).scrollTop();
     
      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
         return;

         // If they scrolled down and are past the header, add class .fly-up.
         // This is necessary so you never see what is "behind" the header.
         if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.header-show-hide-on-scroll').addClass('fly-up');
         } else {
         // Scroll Up
         if(st + $(window).height() < $(document).height()) {
            $('.header-show-hide-on-scroll').removeClass('fly-up');
         }
      }

      lastScrollTop = st;
   }


   // Header Filled (cbpAnimatedHeader) 
   // More info: http://tympanus.net/codrops/2013/06/06/on-scroll-animated-header/
   // ====================================
   var cbpAnimatedHeader = (function() {

      var docElem = document.documentElement,
         header = document.querySelector( '#header' ),
         didScroll = false,
         changeHeaderOn = 1;

      function init() {
         window.addEventListener( 'scroll', function( event ) {
             if( !didScroll ) {
                 didScroll = true;
                 setTimeout( scrollPage, 300 );
             }
         }, false );
      }

      function scrollPage() {
         var sy = scrollY();
         if ($(this).scrollTop() > 80){  
            $('#header.header-fixed-top, #header.header-show-hide-on-scroll').addClass("header-filled");
         }
         else{
            $('#header.header-fixed-top, #header.header-show-hide-on-scroll').removeClass("header-filled");
         }
            didScroll = false;
      }

      function scrollY() {
         return window.pageYOffset || docElem.scrollTop;
      }

      init();

   })();


   // Set padding-top to <body> if needed
   // ====================================
   $(window).on("resize",function() {

      // Make <body> padding-top equal to "#header" height if "#header" contains one of these classes: "header-fixed-top", "header-show-hide-on-scroll".
      if ($('#header').is('.header-fixed-top, .header-show-hide-on-scroll')) {
        $('body').css( 'padding-top', $('#header').css('height'));
      }

      // Set "body" padding-top to "0" if "#header" contains class: "header-transparent".
      if ($('#header').is('.header-transparent')) {
        $('body').css('padding-top', 0);
      }

   }).resize();


   // Header attributes
   // ==================
   
   // Header attributes dropdown (open dropdown on hover)
   $('.h-attr-dropdown-wrap').on("mouseenter",function(){
      $(this).addClass('h-attr-dropdown-open');
   }).on("mouseleave",function(){
      $(this).removeClass('h-attr-dropdown-open');
   });

   // Header attributes search toggle trigger
   $('.h-attr-search-trigger').on('click', function() {
      $('body').addClass('h-attr-search-open');

      return false;    
   });

   // Header attributes search close button
   $('.h-attr-search-close').on('click', function() {
      $('body').removeClass('h-attr-search-open');
   });


   // Header attributes side panel
   // =============================
   if ($('#h-attr-side-panel').length) {
      $('#h-attr-side-panel').appendTo("body");
   }

   $('#h-attr-side-panel-trigger').on('click', function() {
      $('body').addClass('h-attr-side-panel-is-open');

      return false;
   });

   // Header attributes side panel close button
   $('.h-attr-side-panel-close .tt-close-btn').on('click', function() {
      $('body').removeClass('h-attr-side-panel-is-open');
   });


   // Header attributes side panel cover (effect if side menu is open)
   // ===================================
   if ($('#h-attr-side-panel').length) {
      $('body').prepend('<div class="h-attr-side-panel-cover"></div>');
   }

   // Header attributes side panel cover click
   $('.h-attr-side-panel-cover').on('click',function() {
      // Remove class "h-attr-side-panel-is-open" from <body> on side panel cover click
      $('body').removeClass('h-attr-side-panel-is-open');
   });



   // =======================
   // Main menu 
   // =======================

   // Add caret (little arrow down icon) if menu link contains dropdown
   $('.tt-submenu-wrap > a').append('<span class="tt-caret"></span>');


   // tt submenu (open submenu on hover)
   // ===================================
   $('.tt-submenu-wrap').on("mouseenter",function(){
      $(this).addClass('tt-submenu-open');
   }).on("mouseleave",function(){
      $(this).removeClass('tt-submenu-open');
   });


   // Keeping sub-menus inside screen (useful if multi level sub-menus are used). Effect on large screens only!
   // More info: http://stackoverflow.com/questions/17985334/jquery-solution-for-keeping-dropdown-dropdown-inside-screen
   // ===========================
   if ($(window).width() > 992) {
      $('.tt-submenu-master .tt-submenu-wrap > a').parent().on("mouseenter",function() {
         var menu = $('> .tt-submenu',this);
         var menupos = $(menu).offset();

         if (menupos.left + menu.width() > $(window).width()) {
            var newpos = -$(menu).width();
            menu.css({ left: newpos });    
         }
      });
   }


   // Mobile menu
   // ============

   // Add class "tt-m-menu" to mobile menu ("tt-menu-collapse") on smaller devices
   var ttmColl = $('.tt-menu-collapse');
   if ($(window).width() < 975) {
      $(ttmColl).addClass('tt-m-menu');
   }
   $(window).on("resize",function() {
      if ($(window).width() < 975) {
         setTimeout(function(){
            $(ttmColl).addClass('tt-m-menu');
         }, 800);
      } else {
         $(ttmColl).removeClass('tt-m-menu');
      } 
   }).resize();


   // Open/close mobile menu on toggle button click
   // ==============================================
   $('#tt-m-menu-toggle-btn').on('click',function() {
      // Add class "tt-m-menu-open" to <body> if menu is open
      $('body').toggleClass('tt-m-menu-open');

      // Add class "tt-m-menu-noscroll" to <html> if menu is open (disable page scroll)
      $('html').toggleClass('tt-m-menu-noscroll');

      // Close all submenu dropdowns on mobile menu toggle button click
      $('.tt-submenu').delay(300).slideUp(300);

      // Remove class "tt-m-dropdown-open" on dropdown submenu toggle button click
      $('.tt-m-submenu-toggle').removeClass('tt-m-dropdown-open');
   });


   // Mobile menu cover (effect if mobile menu is open)
   // ==================
   $('body').prepend('<div class="tt-m-menu-cover"></div>');

   // Mobile menu cover click
   $('.tt-m-menu-cover').on('click',function() {
      
      // Remove class "tt-m-menu-open" from <body> on mobile menu cover click
      $('body').removeClass('tt-m-menu-open');

      // Close all submenu dropdowns on mobile menu cover click
      $('.tt-submenu').delay(300).slideUp(300);

      // Remove class "tt-m-menu-noscroll" from <html> on mobile menu cover click
      $('html').removeClass('tt-m-menu-noscroll');
   });


   // Mobile submenu toggle button
   // =============================
   $('.tt-submenu-wrap').append('<div class="tt-m-submenu-toggle"></div>');

   // Open/close mobile submenu dropdown on dropdown toggle button click
   $('.tt-m-submenu-toggle').on('click', function() {
      $(this).toggleClass('tt-m-dropdown-open');
      $(this).prev('.tt-submenu').stop().slideToggle(300);
   });



   // =========================================================================
   // Overlay menu
   // =========================================================================

   $('#tt-ol-menu-trigger').on("click",function() {
      $('body').toggleClass('tt-ol-menu-open');

      return false;
   });

   $('.tt-ol-menu-close').on("click",function() {
      $('body').removeClass('tt-ol-menu-open');
   });

   // close overlay menu on outside click
   $(document).on("click",function(e) {
      var $clicked = $(e.target);
      if (!$clicked.parents().hasClass("tt-ol-menu")) {
         // close menu
         $('body').removeClass('tt-ol-menu-open');
      }
   });

   // If "#tt-overlay-menu" exist add class ".tt-ol-menu-on" to <body>.
   if ($('#tt-overlay-menu').length) {
      $('body').addClass('tt-ol-menu-on');
   }


   // overlay menu sub menu
   // ======================
   $('#tt-overlay-menu .has-children > a').on('click', function(){
      // slide up all the submenus
      $("#tt-overlay-menu .tt-ol-sub-menu").slideUp(300);
      // slide down submenus - only if its closed
      if(!$(this).next().is(":visible")){
         $(this).next().slideDown(300);
      }
      return false;
   })

   // close sub menu on outside click
   $(document).on("click",function(e) {
      var $clicked = $(e.target);
      if (!$clicked.parents().hasClass("tt-ol-menu-list")) {
         // close menu
         $("#tt-overlay-menu .tt-ol-sub-menu").slideUp(300);
      }
   });



   // ===============================
   // Page header
   // ===============================

   // if #page-header exist add class "page-header-on" to <body>.
   if ($('#page-header').length) {
      $('body').addClass('page-header-on');
   }

   // if page header contains image add class "page-header-image-on" to <body>.
   if ($('.page-header-image').length) {
      $('body').addClass('page-header-image-on');
   }

   // if class "hide-ph-image" exist remove class "page-header-image-on" from <body>.
   if ($('.page-header-image').hasClass('hide-ph-image')) {
      $('body').removeClass('page-header-image-on');
   }



   // =======================================================================
   // Parallax scrolling effect (transform) 
   // For "page-header", "intro" and "portfolio-list-carousel" only!
   // =======================================================================

   $(window).on("scroll",function() {
      var plxScroll = $(this).scrollTop();

      $('.parallax-1').css('transform', 'translate3d(0, '+ ((plxScroll * 0.1)) +'px, 0)');
      $('.parallax-2').css('transform', 'translate3d(0, '+ ((plxScroll * 0.2)) +'px, 0)');
      $('.parallax-3').css('transform', 'translate3d(0, '+ ((plxScroll * 0.3)) +'px, 0)');
      $('.parallax-4').css('transform', 'translate3d(0, '+ ((plxScroll * 0.4)) +'px, 0)');
      $('.parallax-5').css('transform', 'translate3d(0, '+ ((plxScroll * 0.5)) +'px, 0)');
      $('.parallax-6').css('transform', 'translate3d(0, '+ ((plxScroll * 0.6)) +'px, 0)');
      $('.parallax-7').css('transform', 'translate3d(0, '+ ((plxScroll * 0.7)) +'px, 0)');
      $('.parallax-8').css('transform', 'translate3d(0, '+ ((plxScroll * 0.8)) +'px, 0)');
   });


   // if element contains class ".parallax-*" add css minus top and bottom, equal to "#header" height.
   // =================================================================================================
   $(window).on("resize",function() {

      if ($('.page-header-image, .intro-image-wrap, #page-header .youtube-bg-wrap, #tt-intro .youtube-bg-wrap, .plc-image-wrap').is('[class*="parallax-"]')) {
         $('.page-header-image, .intro-image, #page-header .youtube-bg, #tt-intro .youtube-bg, .plc-image').css({
            'top': - $("#header").height() + "px",
            'bottom': - $("#header").height() + "px"
         });
      }

      // if "#header" contains class ".header-transparent".
      if ($(window).width() > 992) {
         if ($('#header').hasClass('header-transparent')) {
            $('.page-header-image, .intro-image, #page-header .youtube-bg, #tt-intro .youtube-bg, .plc-image').css({
               'top': '0',
               'bottom': '0'
            });
         }
      }

   }).resize();


   // Disable parallax effect on mobile devices (for better user experience).
   // ========================================================================
   var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;
   if(isMobile) {

      // Disable parallax effect on mobile devices in "page-header-caption" 
         $('.page-header-caption').removeClass('parallax-1');
         $('.page-header-caption').removeClass('parallax-2');
         $('.page-header-caption').removeClass('parallax-3');
         $('.page-header-caption').removeClass('parallax-4');
         $('.page-header-caption').removeClass('parallax-5');
         $('.page-header-caption').removeClass('parallax-6');
         $('.page-header-caption').removeClass('parallax-7');
         $('.page-header-caption').removeClass('parallax-8');

      // Disable parallax effect on mobile devices in "intro-caption" 
         $('.intro-caption-wrap').removeClass('parallax-1');
         $('.intro-caption-wrap').removeClass('parallax-2');
         $('.intro-caption-wrap').removeClass('parallax-3');
         $('.intro-caption-wrap').removeClass('parallax-4');
         $('.intro-caption-wrap').removeClass('parallax-5');
         $('.intro-caption-wrap').removeClass('parallax-6');
         $('.intro-caption-wrap').removeClass('parallax-7');
         $('.intro-caption-wrap').removeClass('parallax-8');

      // Disable parallax effect on mobile devices in "plc-caption (portfolio list carousel caption)" 
         $('.plc-caption-wrap').removeClass('parallax-1');
         $('.plc-caption-wrap').removeClass('parallax-2');
         $('.plc-caption-wrap').removeClass('parallax-3');
         $('.plc-caption-wrap').removeClass('parallax-4');
         $('.plc-caption-wrap').removeClass('parallax-5');
         $('.plc-caption-wrap').removeClass('parallax-6');
         $('.plc-caption-wrap').removeClass('parallax-7');
         $('.plc-caption-wrap').removeClass('parallax-8');


      // Uncomment below code if you want to tisable parallax effect on mobile devices in "page-header-image" 
         // $('.page-header-image').removeClass('parallax-1');
         // $('.page-header-image').removeClass('parallax-2');
         // $('.page-header-image').removeClass('parallax-3');
         // $('.page-header-image').removeClass('parallax-4');
         // $('.page-header-image').removeClass('parallax-5');
         // $('.page-header-image').removeClass('parallax-6');
         // $('.page-header-image').removeClass('parallax-7');
         // $('.page-header-image').removeClass('parallax-8');

      // Uncomment below code if you want to tisable parallax effect on mobile devices in "intro-image" 
         // $('.intro-image-wrap').removeClass('parallax-1');
         // $('.intro-image-wrap').removeClass('parallax-2');
         // $('.intro-image-wrap').removeClass('parallax-3');
         // $('.intro-image-wrap').removeClass('parallax-4');
         // $('.intro-image-wrap').removeClass('parallax-5');
         // $('.intro-image-wrap').removeClass('parallax-6');
         // $('.intro-image-wrap').removeClass('parallax-7');
         // $('.intro-image-wrap').removeClass('parallax-8');

      // Uncomment below code if you want to tisable parallax effect on mobile devices in "plc-caption (portfolio list carousel caption)"
         // $('.plc-image-wrap').removeClass('parallax-1');
         // $('.plc-image-wrap').removeClass('parallax-2');
         // $('.plc-image-wrap').removeClass('parallax-3');
         // $('.plc-image-wrap').removeClass('parallax-4');
         // $('.plc-image-wrap').removeClass('parallax-5');
         // $('.plc-image-wrap').removeClass('parallax-6');
         // $('.plc-image-wrap').removeClass('parallax-7');
         // $('.plc-image-wrap').removeClass('parallax-8');
   }



   // ===================================================================
   // Element fade out scrolling effect - for page header and intro only
   // ===================================================================

   $(window).on("scroll",function() {
      $(".fade-out-scroll-1").css("opacity", 1 - $(window).scrollTop() / 150);
      $(".fade-out-scroll-2").css("opacity", 1 - $(window).scrollTop() / 250);
      $(".fade-out-scroll-3").css("opacity", 1 - $(window).scrollTop() / 350);
      $(".fade-out-scroll-4").css("opacity", 1 - $(window).scrollTop() / 450);
      $(".fade-out-scroll-5").css("opacity", 1 - $(window).scrollTop() / 550);
      $(".fade-out-scroll-6").css("opacity", 1 - $(window).scrollTop() / 650);
      $(".fade-out-scroll-7").css("opacity", 1 - $(window).scrollTop() / 750);
      $(".fade-out-scroll-8").css("opacity", 1 - $(window).scrollTop() / 850);
   });


   // Disable fade out effect on mobile devices (for better user experience).
   // ========================================================================
   var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;
   if(isMobile) {

      // Disable fade out effect on mobile devices in "page-header-caption"
         $('.page-header-caption').removeClass('fade-out-scroll-1');
         $('.page-header-caption').removeClass('fade-out-scroll-2');
         $('.page-header-caption').removeClass('fade-out-scroll-3');
         $('.page-header-caption').removeClass('fade-out-scroll-4');
         $('.page-header-caption').removeClass('fade-out-scroll-5');
         $('.page-header-caption').removeClass('fade-out-scroll-6');
         $('.page-header-caption').removeClass('fade-out-scroll-7');
         $('.page-header-caption').removeClass('fade-out-scroll-8');

      // Disable fade out effect on mobile devices in "intro-caption"
         $('.intro-caption-wrap').removeClass('fade-out-scroll-1');
         $('.intro-caption-wrap').removeClass('fade-out-scroll-2');
         $('.intro-caption-wrap').removeClass('fade-out-scroll-3');
         $('.intro-caption-wrap').removeClass('fade-out-scroll-4');
         $('.intro-caption-wrap').removeClass('fade-out-scroll-5');
         $('.intro-caption-wrap').removeClass('fade-out-scroll-6');
         $('.intro-caption-wrap').removeClass('fade-out-scroll-7');
         $('.intro-caption-wrap').removeClass('fade-out-scroll-8');
   }



   // ===================================================================================
   // jQuery Lazy (lazy-loading plugin)
   // More info: http://jquery.eisbehr.de/lazy/
   // ===================================================================================
   $('.lazy').Lazy({
      effect: 'fadeIn', // Function name of the effect you want to use to show the loaded images, like show or fadein.
      effectTime: 400, // Time in milliseconds the effect should use to view the image.
      visibleOnly: true, // Determine if only visible elements should be load.
      threshold: 500, // Amount of pixels below the viewport, in which all images gets loaded before the user sees them.
      enableThrottle: true, // Throttle down the loading calls on scrolling event.
      throttle: 250, // Time in milliseconds the throttle will use to limit the loading calls.
      beforeLoad: function(element) {
         // called before an elements gets handled
         element.addClass('lazy-loader');
      },
      afterLoad: function(element) {
         // called after an element was successfully handled
         element.removeClass('lazy-loader');
      },
      onError: function(element) {
         // called whenever an element could not be handled
         console.log('error loading ' + element.data('src'));
         
         element.removeClass('lazy-loader').addClass('lazy-error');
      }
   });



   // ===================================================================================
   // Isotope
   // More info: http://isotope.metafizzy.co
   // Note: "imagesloaded" blugin is required: https://github.com/desandro/imagesloaded
   // ===================================================================================

   // init Isotope
   var $container = $('.isotope-items-wrap');
   $container.imagesLoaded(function() {
      $container.isotope({
         itemSelector: '.isotope-item',
         transitionDuration: '0.7s',
         masonry: {
            columnWidth: '.grid-sizer',
            horizontalOrder: false
         }
      });
   });

   // Filter
   $('.isotope-filter-links button').on("click",function(){
      var selector = $(this).attr('data-filter');
      $container.isotope({
         filter: selector
      });
      return false;
   });

   // Filter item active
   var filterItemActive = $('.isotope-filter-links button');
   filterItemActive.on('click', function(){
      var $this = $(this);
      if ( !$this.hasClass('active')) {
         filterItemActive.removeClass('active');
         $this.addClass('active');
      }
   });


   // If "isotope-top-content" exist add class ".iso-top-content-on" to <body>.
   if ($('.isotope-top-content').length) {
      $('body').addClass('iso-top-content-on');
   }

   // If ".isotope-filter" contains class "fi-btn" add class "fi-btn-on" to <body> tag.
   if ($('.isotope-filter').hasClass('fi-btn')) {
      $('body').addClass('fi-btn-on');
   }

   // Filter button clickable/hover (clickable on small screens)
   if ( $(window).width() < 992) {

      // Filter button clickable (effect on small screens)
      $('.isotope-filter-button').on("click",function() {
         $('.isotope-filter').toggleClass('iso-filter-open');
      });

      // Close filter button if click on filter links (effect only on small screens)
      $('.isotope-filter-links > li > button').on("click",function() {
         $(".isotope-filter-button").click();
      });

   } else {

      // Filter button on hover
      $('.isotope-filter.fi-btn').on("mouseenter",function(){
         $('.isotope-filter').addClass('iso-filter-open');
      }).on("mouseleave",function(){
         $('.isotope-filter').removeClass('iso-filter-open');
      });

   }


   // if class "isotope" exist.
   if ($('.isotope').length){
      
      // add overflow scroll to <html> (isotope items gaps fix).
      if ( document.querySelector('body').offsetHeight > window.innerHeight ) {
         document.documentElement.style.overflowY = 'scroll';
      }

      // Add class "isotope-on" to <body>.
      $('body').addClass('isotope-on');
   }


   // Add class "iso-gutter-*-on" to <body> if ".isotope" contains class "gutter-*".
   if ($('.isotope').hasClass('gutter-1')) {
      $('body').addClass('iso-gutter-1-on');
   }

   if ($('.isotope').hasClass('gutter-2')) {
      $('body').addClass('iso-gutter-2-on');
   }

   if ($('.isotope').hasClass('gutter-3')) {
      $('body').addClass('iso-gutter-3-on');
   }


   // Add class "iso-tt-wrap-on" to <body> if ".isotope-wrap" contains class "tt-wrap".
   if ($('.isotope-wrap').hasClass('tt-wrap')) {
      $('body').addClass('iso-tt-wrap-on');
   }



   // =====================================================
   // OWL Carousel
   // More info: https://owlcarousel2.github.io/OwlCarousel2/
   // Note: "animate.css" library is required: https://daneden.github.io/animate.css/
   // =====================================================

   $(window).on('load', function() { // fixes Owl Carousel "autoWidth: true" issue (https://github.com/OwlCarousel2/OwlCarousel2/issues/1139).

      $('.owl-carousel').each(function() {
         var $carousel = $(this);
         $carousel.owlCarousel({

            items: $carousel.data("items"),
            loop: $carousel.data("loop"),
            margin: $carousel.data("margin"),
            center: $carousel.data("center"),
            startPosition: $carousel.data("start-position"),
            animateIn: $carousel.data("animate-in"),
            animateOut: $carousel.data("animate-out"),
            autoWidth: $carousel.data("autowidth"),
            autoHeight: $carousel.data("autoheight"),
            autoplay: $carousel.data("autoplay"),
            autoplayTimeout: $carousel.data("autoplay-timeout"),
            autoplayHoverPause: $carousel.data("autoplay-hover-pause"),
            autoplaySpeed: $carousel.data("autoplay-speed"),
            nav: $carousel.data("nav"),
            navText: ['', ''],
            navSpeed: $carousel.data("nav-speed"),
            dots: $carousel.data("dots"),
            dotsSpeed: $carousel.data("dots-speed"),
            mouseDrag: $carousel.data("mouse-drag"),
            touchDrag: $carousel.data("touch-drag"),
            dragEndSpeed: $carousel.data("drag-end-speed"),
            lazyLoad: $carousel.data("lazy-load"),
            video: true,
            onLoadLazy: owlLazyLoading,
            onLoadedLazy: owlLazyLoaded,
            responsive: {
               0: {
                  items: $carousel.data("mobile-portrait"),
                  center: false,
               },
               480: {
                  items: $carousel.data("mobile-landscape"),
                  center: false,
               },
               768: {
                  items: $carousel.data("tablet-portrait"),
                  center: false,
               },
               992: {
                  items: $carousel.data("tablet-landscape"),
               },
               1200: {
                  items: $carousel.data("items"),
               }
            }

         });

         // Mousewheel plugin
         var owl = $('.owl-mousewheel');
         owl.on('mousewheel', '.owl-stage', function (e) {
            if (e.deltaY > 0) {
               owl.trigger('prev.owl', [800]);
            } else {
               owl.trigger('next.owl', [800]);
            }
            e.preventDefault();
         });

      });

   });


   // CC item hover
   $('.cc-item').on('mouseenter',function() {
      $('.owl-carousel').addClass('cc-item-hovered');
   });
   $('.cc-item').on('mouseleave',function() {
      $('.owl-carousel').removeClass('cc-item-hovered');
   });

   // If ".cc-caption" exist, add class "cc-caption-on" to ".cc-item".
   $('.cc-item').each(function() {
      if ($(this).find('.cc-caption').length) {
         $(this).addClass('cc-caption-on');
      }
   });

   // if class ".owl-lazy" exist, add "<div class="owl-lazy-loader"></div>" to parent element.
   $('.owl-lazy').each(function() {
      $(this).parent().prepend('<div class="owl-lazy-loader"></div>');
   });

   // Owl Callbacks
   function owlLazyLoading(event) {
      $('.owl-lazy-loader').each(function() {
         $(this).addClass('owl-lazy-loading');
      });
   }
   function owlLazyLoaded(event) {
      $('.owl-lazy-loader').each(function() {
         $(this).removeClass('owl-lazy-loading');
      });
   }



   // =====================================================
   // lightGallery (lightbox plugin)
   // Source: http://sachinchoolur.github.io/lightGallery
   // =====================================================

   $(".lightgallery").lightGallery({

      // Please read about gallery options here: http://sachinchoolur.github.io/lightGallery/docs/api.html

      // lightgallery core 
      selector: '.lg-trigger',
      mode: 'lg-fade', // Type of transition between images ('lg-fade' or 'lg-slide').
      height: '100%', // Height of the gallery (ex: '100%' or '300px').
      width: '100%', // Width of the gallery (ex: '100%' or '300px').
      iframeMaxWidth: '100%', // Set maximum width for iframe.
      loop: true, // If false, will disable the ability to loop back to the beginning of the gallery when on the last element.
      speed: 600, // Transition duration (in ms).
      closable: true, // Allows clicks on dimmer to close gallery.
      escKey: true, // Whether the LightGallery could be closed by pressing the "Esc" key.
      keyPress: true, // Enable keyboard navigation.
      hideBarsDelay: 5000, // Delay for hiding gallery controls (in ms).
      controls: true, // If false, prev/next buttons will not be displayed.
      mousewheel: true, // Chane slide on mousewheel.
      download: false, // Enable download button. By default download url will be taken from data-src/href attribute but it supports only for modern browsers. If you want you can provide another url for download via data-download-url.
      counter: true, // Whether to show total number of images and index number of currently displayed image.
      swipeThreshold: 50, // By setting the swipeThreshold (in px) you can set how far the user must swipe for the next/prev image.
      enableDrag: true, // Enables desktop mouse drag support.
      enableTouch: true, // Enables touch support.
      getCaptionFromTitleOrAlt: false, // Option to get captions from alt or title tags.

      // thumbnail plugin
      thumbnail: true, // Enable thumbnails for the gallery.
      showThumbByDefault: false, // Show/hide thumbnails by default.
      thumbMargin: 5, // Spacing between each thumbnails.
      toogleThumb: true, // Whether to display thumbnail toggle button.
      enableThumbSwipe: true, // Enables thumbnail touch/swipe support for touch devices.
      exThumbImage: 'data-exthumbnail', // If you want to use external image for thumbnail, add the path of that image inside "data-" attribute and set value of this option to the name of your custom attribute.

      // autoplay plugin
      autoplay: false, // Enable gallery autoplay.
      autoplayControls: true, // Show/hide autoplay controls.
      pause: 6000, // The time (in ms) between each auto transition.
      progressBar: true, // Enable autoplay progress bar.
      fourceAutoplay: false, // If false autoplay will be stopped after first user action

      // fullScreen plugin
      fullScreen: true, // Enable/Disable fullscreen mode.

      // zoom plugin
      zoom: true, // Enable/Disable zoom option.
      scale: 0.5, // Value of zoom should be incremented/decremented.
      enableZoomAfter: 50, // Some css styles will be added to the images if zoom is enabled. So it might conflict if you add some custom styles to the images such as the initial transition while opening the gallery. So you can delay adding zoom related styles to the images by changing the value of enableZoomAfter.

      // video options
      videoMaxWidth: '1000px', // Set limit for video maximal width.

      // Youtube video options
      loadYoutubeThumbnail: true, // You can automatically load thumbnails for youtube videos from youtube by setting loadYoutubeThumbnail true.
      youtubeThumbSize: 'default', // You can specify the thumbnail size by setting respective number: 0, 1, 2, 3, 'hqdefault', 'mqdefault', 'default', 'sddefault', 'maxresdefault'.
      youtubePlayerParams: { // Change youtube player parameters: https://developers.google.com/youtube/player_parameters
         modestbranding: 0,
         showinfo: 1,
         controls: 1
      },

      // Vimeo video options
      loadVimeoThumbnail: true, // You can automatically load thumbnails for vimeo videos from vimeo by setting loadYoutubeThumbnail true.
      vimeoThumbSize: 'thumbnail_medium', // Thumbnail size for vimeo videos: 'thumbnail_large' or 'thumbnail_medium' or 'thumbnail_small'.
      vimeoPlayerParams: { // Change vimeo player parameters: https://developer.vimeo.com/player/embedding#universal-parameters 
         byline : 1,
         portrait : 1,
         title: 1,
         color : 'CCCCCC',
         autopause: 1
      },

      // hash plugin (unique url for each slides)
      hash: true, // Enable/Disable hash plugin.
      hgalleryId: 1, // Unique id for each gallery. It is mandatory when you use hash plugin for multiple galleries on the same page.

      // share plugin
      share: false, // Enable/Disable share plugin.
         facebook: true, // Enable Facebook share.
         facebookDropdownText: 'Facebook', // Facebok dropdown text.
         twitter: true, // Enable Twitter share.
         twitterDropdownText: 'Twitter', // Twitter dropdown text.
         googlePlus: true, // Enable Google Plus share.
         googlePlusDropdownText: 'Google+', // Google Plus dropdown text.
         pinterest: true, // Enable Pinterest share.
         pinterestDropdownText: 'Pinterest' // Pinterest dropdown text.

   });



   // =======================================================
   // YTPlayer (Background Youtube video)
   // Source: https://github.com/pupunzi/jquery.mb.YTPlayer
   // =======================================================

   // Disabled on mobile devices, because video background doesn't work on mobile devices (instead the background image is displayed).
   if (!jQuery.browser.mobile) { 
      $(".youtube-bg").mb_YTPlayer();
   }



   // ===================================================
   // jQuery.dotdotdot
   // More info: https://github.com/FrDH/jQuery.dotdotdot
   // ===================================================

   $(".tt-ellipsis").dotdotdot({
      ellipsis: " ...",
      wrap: "word"
   });



   // =======================================================================================
   // Counter-Up
   // More info: https://github.com/ciromattia/jquery.counterup
   // Note: Requires jQuery waypoints.js plugin: https://github.com/imakewebthings/waypoints
   // =======================================================================================

   $(window).on('load', function() { // wait until the whole page loads
      $('.counter-up-wrap.cu-animated .counter-up').counterUp({
         delay: 10, // The delay in milliseconds per number count up.
         time: 1000, // The total duration of the count up animation.
         offset: 100, // The viewport percentile from which the counter starts (by default it's 100, meaning it's triggered at the very moment the element enters the viewport).
         beginAt: 0 // The number from which to count up.
      });
   });



   // ==================================
   // Remove input placeholder on focus
   // ==================================

   $('input,textarea').on("focus",function() {
      $(this).data('placeholder', $(this).attr('placeholder'))
         .attr('placeholder', '');
   }).on("blur",function() {
      $(this).attr('placeholder', $(this).data('placeholder'));
   });



   // ===============
   // Sticky share
   // ===============

   $('.sticky-share-button').on("click", function(e) {
      $('.sticky-share').toggleClass('sticky-share-open');
   });
   $(document).on('click', function(event) {
      if (!$(event.target).closest('.sticky-share').length)  {
         $(".sticky-share").removeClass("sticky-share-open");
      }
   });



   // ===============================================
	// uniMail - Universal PHP Mail Feedback Script
	// Source: https://github.com/agragregra/uniMail
	// ===============================================

	// E-mail Ajax Send
	$("#contact-form").submit(function() { // your contact form ID.
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", // mail.php path.
			data: th.serialize()
		}).done(function() {
			alert("Thank you. Your message has been sent!");
			setTimeout(function() {
			// Done Functions
			th.trigger("reset");
			}, 1000);
		});
		return false;
	});



   // ======================
   // Footer
   // ======================

   // If "#footer" contains class "footer-minimal" add class "footer-minimal-on" to <body>.
   if ($('#footer').hasClass('footer-minimal')) {
      $('body').addClass('footer-minimal-on');
   }



   // ======================
   // Scroll to top button
   // ======================

   // Check to see if the window is top if not then display button
   $(window).on("scroll",function() {
      if ($(this).scrollTop() > 500) {
         $('.scrolltotop').fadeIn();
      } else {
         $('.scrolltotop').fadeOut();
      }
   });



   // ===============
   // Miscellaneous
   // ===============

   // Bootstrap modal fix
   $('.modal').appendTo("body");

   // Bootstrap tooltip
   $('[data-toggle="tooltip"]').tooltip();

   // Bootstrap popover
   $('[data-toggle="popover"]').popover({
      html: true
   });

   // Hover fix for iOS
   $('*').on('touchstart',function() {
      $(this).trigger('hover');
   }).on('touchend',function() {
      $(this).trigger('hover');
   });



})(jQuery);
