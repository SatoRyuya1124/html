$(function(){

  var w = $(window);
  var ww = window.innerWidth;
  var wh = w.height();
  var wst = w.scrollTop();
  var b = $('body');

  // menu
  var wstm = 0;
  var mt = $('#menu-toggle');
  $('#menu-toggle, #menu-bg').click(function(){
    $('#global-menu').fadeToggle(200, 'swing', function(){
      if ( $(this).css('display') == 'block' ) {
        wstm = w.scrollTop();
        $(this).addClass('global-menu--active');
        mt.addClass('menu-active');
      } else {
        $(this).removeClass('global-menu--active');
        mt.removeClass('menu-active');
      }
    })
  });
  
  // image zoom
  $('.page-style a[href$=".jpg"]:has(img), .page-style a[href$=".png"]:has(img)').each(function(){
    $('img', this).attr('data-action', 'zoom');
    $(this).on('click', function(e){ e.preventDefault(); });
  });

	// post
	if ($('#anchorlist').length) {
		$('#anchorlist').anchorlist({ anchor: $('.post-body, .page-body') });
	}

  // top works
  var tws = $('#works-slide');
  if ( tws.length ) {

    tws.find('.works-slide__unit').addClass('img--loading');

    var wsimgs = tws.find('img');
    wsimgs.each(function() {
      var that = $(this);
      $(this).imagesLoaded( function() {
        that.addClass('img--active');
        that.closest('.works-slide__unit').removeClass('img--loading');
      });
    });

    tws.on('inview', function(event, isInView) {
      if (isInView) {
  
      $(this).slick({
        lazyLoad: 'ondemand',
        centerMode: true,
        dots: false,
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        centerPadding: 0,
        cssEase: 'ease-in-out',
        arrows: true,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        responsive: [
          {
            breakpoint: 769,
            settings: {
              centerMode: false,
              autoplaySpeed: 3000,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: false,
              autoplaySpeed: 3000,
              slidesToShow: 1
            }
          }
        ]
      });
  
      }
    });
  }

  // top blog
  var tas = $('#articles-slide');
  if ( tas.length ) {

    var tasthumbs = $(this).find('.articles-slide__thumb');

    tas.on('inview', function(event, isInView) {
      if (isInView) {
        
        $(this).slick({
          dots: false,
          infinite: false,
          speed: 400,
          autoplay: false,
          autoplaySpeed: 5000,
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
          cssEase: 'ease-in-out',
          arrows: true,
          prevArrow: '<div class="slick-prev"></div>',
          nextArrow: '<div class="slick-next"></div>',
          responsive: [
            {
              breakpoint: 769,
              settings: {
                autoplaySpeed: 3000,
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                autoplaySpeed: 3000,
                slidesToShow: 1
              }
            }
          ]
        });

        tasthumbs.each(function(){
          var that = $(this);
          $(this).css('background-image', 'url(' + $(this).attr('data-lazy-bg') + ')')
        }).imagesLoaded( { background: true }, function() {
          tas.addClass('articles-slide--active');
        });

      }
    });
  }
  
  
  // scroll

  $('.inview, .page-header__heading').on('inview', function(event, isInView) {
    if (isInView) $(this).addClass('inview--active');
  });

  var scrl_timer;
  var scrl_once_timer;
  var pu = $('#pageup');
  var gt = $('#global-ttl');
  var as = $('#arr-scroll');

  setTimeout (function(){
    $('.top-header__copy').addClass('top-header__copy--active');
  }, 100);

  setTimeout (function(){
    wst = w.scrollTop();
    if ( wst < ( ( wh / 3 ) * 2 ) )
          as.addClass('top-header__arr-scroll--active');
  }, 1000);

  w.on('scroll resize', function(){
    
    if ( scrl_timer ) clearTimeout(scrl_timer);
    scrl_timer = setTimeout(function(){

      wh = w.height();
      wst = w.scrollTop();
      
      if ( wst < wh ) pu.removeClass('pageup--active');
      else pu.addClass('pageup--active');
      
      if ( wst > ( wh / 3 ) && as.hasClass('top-header__arr-scroll--active') )
        as.removeClass('top-header__arr-scroll--active');
      
    }, 300);
    
    if ( !scrl_once_timer ) {
      scrl_once_timer = setTimeout(function(){

        $('.service__pict img').each( function(){
          $(this).attr('src', $(this).attr('data-lazy'));
        });
      
      }, 300);
    }
    
  });
  
  // search box
  var sbx = $('#searchbox');
  var scn = $('#searchbox-container');
  var sin = scn.find('.searchbox__input');
  $('#searchbox-icon, #searchbox-caption').click(function(){
    if ( scn.css('width') == '0px' ) {
      sbx.addClass('searchbox--active');
      sin.focus();
    }
  });
  sin.blur(function(){
    sbx.removeClass('searchbox--active');
  });
  
  // work slide

  var wsl = $('#work-slide');
  if ( wsl.length ) {

    var wpbg = $('.wp-block-gallery');
    if ( wpbg.length ) {

      wpbg.find('img').each(function(){
        var imgsrc = $(this).attr('src');
        if ( $(this).attr('data-full-url').length ) {
          imgsrc = $(this).attr('data-full-url');
        }
        var el = '<div class="work-slide__unit"><img src="' + imgsrc + '" alt="" width="1600" height="1200"></div>';
        wsl.append(el);
      });
      wpbg.hide();
    }

    wsl.slick({
      dots: true,
      infinite: true,
      speed: 400,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      cssEase: 'ease-in-out',
      arrows: false,
      fade: true,
    });
  }
  
  // work filter
  if ( $('.works-filter').length ) {
    $('.works-filter__list a').click(function(e){
      
      e.preventDefault();

      $('.works-filter__list li').removeClass('filter-active');
      $(this).closest('li').addClass('filter-active');

      var link = $(this).attr('href');
      link = link.replace(/#/, '');
      
      if ( link == 'all' )
        $('.works-unit').removeClass('filter-remove');
      else {
        $('.works-unit:not(.' + link + ')').addClass('filter-remove');
        $('.works-unit.' + link ).removeClass('filter-remove');
      }

    });
  }
  
  // accordion
  $('.accordion-wrap__btn').on('click', function(){
    $(this).closest('.accordion-wrap').toggleClass('accordion-wrap--open');
  });
  
  // auto scroll
	$('.scroll a, a.scroll').on('click', function(){
		var href = $(this).attr('href');
		if (href == '#' || href == '') var position = 0;
		else var position = $(href).offset().top;
		$('html, body').animate({ scrollTop: position }, 500, 'swing');
		return false;
	});
	$('#pageup').on('click', function(){
		$('html, body').animate({ scrollTop: 0 }, 500, 'swing');
		return false;
	});

	// external link
	$('a[href^="http"]:not(a[href*="hasegawahiroshi.jp"]), a[rel="external"]').attr({
    target: '_blank',
    rel: 'noopener'
  });

	// cal
	if ($('#calendar').length) {
		$('#calendar').fullCalendar({

			googleCalendarApiKey: 'AIzaSyApRn22P0GvV-dWZxNdkNtXxJ0kQCTFGZ4',
			events: {
	            googleCalendarId: '0i1lp8sl9ntntrcmi59635ir1s@group.calendar.google.com'
	        },
			firstDay: 1,
			height: 'auto',
			loading: function(bool) {
				$('#loading-cal').toggle(bool);
			},
			titleFormat: {
				month: 'YYYY.MMMM'
			},
			timeFormat: 'H:mm',
			columnFormat: {
				month: 'ddd',
				week: 'M/d (ddd)',
				day: 'M/d (dddd)'
			},
			monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
			buttonText: {
				prev: ' ',
				next: ' ',
				today: 'TODAY'
			}
			
		});
			
		$('.fc-toolbar h2').append('<span id="loading-cal"></span>');
	}

	// ml
	var ml = code2char(
		String.fromCharCode(113,95,114,109,115,48,46,46,52,50,55,62,99,101,101,108,99,114,44,95,97,44,104,110 )
  );
	if ($('.ml').length) {
		var mlic = $('.ml').html();
		$('.ml').html('<a href="m' + 'ai' + 'lto:' + ml + '">' + mlic + ml + '</a>');
	}
});

function code2char(t){
	var s = ''; var mj = '';
	for(var i=0; i<t.length; i++) {
		mj = t.charCodeAt(i);
		s += String.fromCharCode(mj + 2);
	}
	return s;
}
