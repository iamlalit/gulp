//bootstrap carousel image slider to slide the image
$(document).ready(function(){
    $('.carousel').carousel({
      interval: false,
      pause: ''
    });
    $('#contact-slider').off('keydown.bs.carousel');
});