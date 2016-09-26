/**
 * @file aps-crossfade.js
 *
 * @description
 *    A very simple plugin that allows you to make a slideshow from a <div> with <img> elements in it.
 *    The only animation available is a crossfade.
 *
 * @usage
 *    The HTML structure necessary is:
 *    <code>
 *      <div>
 *        <img src="some_image_0.jpg" />
 *        <img src="some_image_1.jpg" />
 *        <img src="some_image_2.jpg" />
 *      </div>
 *    </code>
 *
 *    To initialise the slideshow, simply pass the container element to it using jQuery.
 *    <code>
 *      <script type="text/javascript>
 *        $('div div.content > div.slider').apsImageCrossfader({
 *          delay : 4000,
 *          speed : 600
 *        });
 *      </script>
 *    </code>
 *
 * @param int delay
 *    The amount of time (in milliseconds) between slide changes.
 *
 * @param int speed
 *    The amount of time (in milliseconds) that the crossfade takes to complete animation.
 *
 * @param object imgCss
 *    An object with CSS properties defined to be applied to the <img> elements inside the container.
 *    The object should follow the standards as explained at: http://api.jquery.com/css/
 *
 * @return object jQuery Element Object
 *    The plugin will return the jQuery Element Object that was passed to it.
 *
 * @return array jQuery Element Objects
 *    The plugin will also make the activated slideshows available in the DOM in an object at the root level called APSactiveSlideshows.
 *    Within it, you will find an array called "sliders" within which each index is one of the sliders.
 *    <code>
 *      APSactiveSlideshows = {
 *        sliders : [
 *          0 : jQuery('someContainer')
 *        ]
 *      }
 *    </code>
 *
 *
 */
(function($){
  $.fn.apsImageCrossfader = function (userOpts) {
    if(typeof window.APSactiveSlideshows === 'undefined') {
      window.APSactiveSlideshows = {
        sliders : []
      };
    }

    $(this).each(function () {
      var thisSlider,
        sliderIndex = (window.APSactiveSlideshows.sliders.length <= 0) ? 0 : window.APSactiveSlideshows.sliders.length + 1;
      window.APSactiveSlideshows.sliders[sliderIndex] = thisSlider = $(this);

      // set defaults
      thisSlider.defOpts = {},
        thisSlider.defOpts.delay = 4000,
        thisSlider.defOpts.speed = 600,
        thisSlider.defOpts.imgCss = {position: 'absolute', top: 0, left: 0};

      thisSlider.slideOpts = $.extend({}, thisSlider.defOpts, userOpts);

      thisSlider.slideOpts.container = thisSlider.css({background : 'none', position: 'relative'}),
        thisSlider.slideOpts.slides = $('img', thisSlider.slideOpts.container).css(thisSlider.slideOpts.imgCss),
        thisSlider.slideOpts.activeSlide = thisSlider.slideOpts.slides.first(),
        thisSlider.slideOpts.nextSlide = thisSlider.slideOpts.activeSlide.next(),
        thisSlider.slideOpts.isFirst = true;

      thisSlider.slideOpts.slides.css({
        'display' : 'block'
      }).each(function(){
          $(this).prependTo($(this).parent());
        });

      thisSlider.slideOpts.slideSwitch = function() {
        thisSlider.slideOpts.container.children('img').last().animate({opacity : 0}, thisSlider.slideOpts.speed, function(){
          $(this).prependTo($(this).parent());
          $(this).css({opacity : 1});
        });
      }

      var firstRun = setTimeout(
        function(){
          thisSlider.slideOpts.slideSwitch();
          clearTimeout(firstRun);

          setInterval(
            function(){
              thisSlider.slideOpts.slideSwitch();
            },
            thisSlider.slideOpts.delay
          );
        },
        thisSlider.slideOpts.delay / 2
      );
    })

    return $(this);
  }

  $().ready(function(){
    $('#veggie-intro-right').apsImageCrossfader({
        delay : 2000,
        speed : 2000
    });
  });
})(jQuery);
