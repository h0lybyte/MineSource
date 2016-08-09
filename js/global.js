

jQuery(function($) {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, $container, _isresponsive, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
		if($('.menu-button').is(':visible')) _isresponsive = true;
		else _isresponsive = false;
	}

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	pageCalculations();	

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		$('#loader-wrapper').fadeOut();
		initSwiper();
		if($('.isotope-filter').length){
			var initValue = $('.isotope-nav').find('.selected a').attr('data-filter');
			$container.isotope({itemSelector: '.isotope-item', filter: initValue,masonry:{gutter:0,columnWidth:'.grid-sizer'}});			
		}
		if($('.isotope').length){
			$container.isotope({itemSelector: '.isotope-item', masonry:{gutter:0,columnWidth:'.grid-sizer'}});			
		}				
	});
	
	/*==============================*/
	/* 05 - function on page scroll */
	/*==============================*/	
	$(window).on("scroll", function() {
		winScr = $(window).scrollTop();
		if (winScr > 0){
			$(".tt-header").addClass("stick");
		} else {
			$(".tt-header").removeClass("stick");
		}	
	});		

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	function resizeCall(){
		pageCalculations();

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t);
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			var paginationSpan = $t.find('.pagination span');
			var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
			if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
			else $t.removeClass('pagination-hidden');
			paginationSlice.show();
		});
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);
			var centerVar = parseInt($t.attr('data-center'),10);
			var simVar = ($t.closest('.circle-description-slide-box').length)?false:true;

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: simVar,
				centeredSlides: centerVar,
				roundLengths: true,
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					var qVal = $t.find('.swiper-slide-active').attr('data-val');
					$t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
				},
				onSlideChangeStart: function(swiper){
					$t.find('.swiper-slide.active').removeClass('active');
				},
				onSlideClick: function(swiper){

				}
			});
			swipers['swiper-'+index].reInit();
			if($t.attr('data-slides-per-view')=='responsive'){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
			initIterator++;
		});

	}

	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else return parseInt(swiperContainer.attr('data-xs-slides'),10);
	}

	//swiper arrows
	$('.swiper-arrow-left').on('click', function(){
		swipers['swiper-'+$(this).parents('.swiper-container').attr('id')].swipePrev();
	});

	$('.swiper-arrow-right').on('click', function(){
		swipers['swiper-'+$(this).parents('.swiper-container').attr('id')].swipeNext();
	});

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/
	//menu
	$('.cmn-toggle-switch').on('click', function(e){
		$(this).toggleClass('active');
		$(this).parents('header').find('.toggle-block').slideToggle();
		e.preventDefault();
	});
	$('.main-nav .menu-toggle').on('click', function(e){
		$(this).closest('li').addClass('active').siblings('.active').removeClass('active');
		$(this).closest('li').siblings('.parent').find('ul').slideUp();
		$(this).parent().siblings('ul').slideToggle();
		e.preventDefault();
	});
	$('.main-nav .menu-toggle-inner').on('click', function(e){
		$(this).closest('li').addClass('active').siblings('.active').removeClass('active');
		$(this).closest('li').siblings('li').find('ul').slideUp();
		$(this).parent().siblings('ul').slideToggle();
		e.preventDefault();
	});

	//video-popup
	$('.tt-video-img,.tt-open-video').on("click", function(e){
		var video = $(this).data('video');			
		$(this).siblings('.tt-video-popup').addClass('active');
		$(this).siblings('.tt-video-popup').find('iframe').attr('src',video);
		e.preventDefault();
	});
	$('.tt-video-close, .tt-video-caption').on("click", function(e){	
		$(this).parents('.tt-video-popup').removeClass('active');
		$(this).parents('.tt-video-popup').find('iframe').attr('src','about:blank');
		e.preventDefault();
	});

	/*==================================================*/
	/* 09 - form elements - checkboxes and radiobuttons */
	/*==================================================*/
    //Tabs
	var tabFinish = 0;
	$('.tt-nav-tab-item').on('click', function(){		
	    var $t = $(this);
	    if(tabFinish || $t.hasClass('active')) return false;
	    tabFinish = 1;
	    $t.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
	    $t.addClass('active');
	    var index = $t.parent().parent().find('.tt-nav-tab-item').index(this);
	    $t.parents('.tt-tab-nav-wrapper').find('.tt-tab-select select option:eq('+index+')').prop('selected', true);
	    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	tabReinit($tabActive.parents('.tt-tab-wrapper'));
	    	$tabActive.animate({opacity:1});
	    	 tabFinish = 0;
	    });
	});
	$('.tt-tab-select select').on('change', function(){
	    var $t = $(this);
	    if(tabFinish) return false;
	    tabFinish = 1;    
	    var index = $t.find('option').index($(this).find('option:selected'));
	    $t.closest('.tt-tab-nav-wrapper').find('.tt-nav-tab-item').removeClass('active');
	    $t.closest('.tt-tab-nav-wrapper').find('.tt-nav-tab-item:eq('+index+')').addClass('active');
	    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	tabReinit($tabActive.parents('.tt-tab-wrapper'));
	    	$tabActive.animate({opacity:1});
	    	 tabFinish = 0;
	    });
	});

	function tabReinit($tab){
		$tab.find('.swiper-container').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this);
			thisSwiper.reInit();	
		});			
	}

	//isotope filter
	$container = $('.isotope-content');
	$('.isotope-nav').on( 'click', 'a', function(e) {
		var filterValue = $(this).attr('data-filter');
		var $buttonGroup = $(this).parent().parent();
		var index = $buttonGroup.find('li').index($(this).parent());
		$buttonGroup.siblings('.isotope-select').find('option:eq('+index+')').prop('selected', true);
		$container.isotope({ filter: filterValue });
		$buttonGroup.find('.selected').removeClass('selected');
		$(this).parent().addClass('selected');
		e.preventDefault();
	});
	$('.isotope-select select').on( 'change', function() {
		var filterValue = $(this).find('option:selected').val();
		var index = $(this).find('option').index($(this).find('option:selected'));
		$container.isotope({ filter: filterValue });
		var $buttonGroup = $(this).parents('.isotope-select').siblings('.isotope-nav');
		$buttonGroup.find('.selected').removeClass('selected');
		$buttonGroup.find('li').eq(index).addClass('selected');
	});

	/*accordion*/
	$('.tt-accordion-title').on( 'click', function(e) {
		if($(this).hasClass('active')){
			$(this).siblings('.tt-accordion-body').slideUp();
			$(this).removeClass('active');
		} else{
			$(this).closest('.tt-accordion').find('.tt-accordion-title.active').removeClass('active');
			$(this).closest('.tt-accordion').find('.tt-accordion-body').slideUp('slow');
			$(this).toggleClass('active');
			$(this).siblings('.tt-accordion-body').slideToggle('slow');
		}
		e.preventDefault();
	});

	/*tt-mslide-2 scroll*/
	$(document).on('click', '.tt-mslide-2-arrow', function(e){
		var $slide = $(this).parents('.tt-mslide-2'),
			offset = $slide.offset().top,
			height = $slide.height(),
			headerH = $('.tt-header .top-inner').height();
			scroll = offset + height - headerH;
		$('html,body').animate({scrollTop:scroll}, 1000);
		e.preventDefault();
	});

	/*tt-scroll-link*/
	$(document).on('click', '.tt-scroll-link', function(e){
		var offset = $('.tt-scroll-block').offset().top,
			headerH = $('.tt-header .top-inner').height();
			scroll = offset - headerH;
		$('html,body').animate({scrollTop:scroll}, 1000);
		e.preventDefault();
	});	

});