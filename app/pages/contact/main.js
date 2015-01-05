var nbDrop = 5;

// function to generate a random number range.
function randRange( minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

var body = document.body,
    html = document.documentElement;

var height = 0; //Math.max( body.scrollHeight, body.offsetHeight,
    //html.clientHeight, html.scrollHeight, html.offsetHeight );

// function to generate drops
/*function createRain() {

    for( var i=1;i<nbDrop;i++) {
        var dropLeft = randRange(100,400);
        //var dropTop = randRange(0,height);
        //var hue = 'rgb(' + (randRange( 1, 120)) + ',' + (randRange( 40, 160)) + ',' + (randRange( 1, 255)) + ')';

        $('.rain').append('<div style="font-size: '+ randRange(18, 50)+'px" class="icomatic droplets" id="drop'+i+'">drop</div>');
        $('#drop'+i).css('left',dropLeft);
        $('#drop'+i).css('top',height);
    }

};*/
/*function doEmpty(){
    $('.rain').empty();
}*/
// Make it rain
setInterval(function(){
    //doEmpty();
    //createRain();
},10000);

/*$(function() {

    var a = $('a[href*=#]:not([href=#])');
    a.on('click',function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1);
                return false;
            }
        }
    });

});*/

function key(){
    $(document).keydown(function(e) {
       return e.keyCode;
    });
}

$(window).on('scroll', function(){
    if(key() == 32){
        console.log('------------------------->'+$(document).scrollTop());
    }
})

//to jump bubbles
$(document).ready(function() {

    //for Discovery
    var kids0 = $( '#zero' ).children( '.info-circle' );
    var kids1 = $( '#one' ).children( '.info-circle' );
    var kids2 = $( '#two' ).children( '.info-circle' );
    var kids3 = $( '#three' ).children( '.info-circle' );
    var kids4 = $( '#four' ).children( '.info-circle' );
    var kids5 = $( '#five' ).children( '.info-circle' );
    var kids6 = $( '#six' ).children( '.info-circle' );

    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();

    //function to determine viewport visibility
    $.fn.isOnScreen = function(){
    
        var win = $(window);
        
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
        
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));  
    };

    var lastScrollTop = 0;
    $(window).scroll(function(event){

        var st = $(this).scrollTop();
        if (st > lastScrollTop){
           var height = $(window).scrollTop()
           var heightOfWindow = $(window).height();
            console.log(height, heightOfWindow);
            if(height > 300){
                $('#strategy').addClass('upwards0-strategy').removeClass('downwards0-strategy');   
                if(height > 340){
                    $('#strategy').addClass('upwards1-strategy').removeClass('upwards0-strategy downwards1-strategy');  
                    if(height > 380){
                        $('#strategy').addClass('upwards2-strategy').removeClass('upwards1-strategy downwards2-strategy'); 
                        if(height > 420){
                            $('#strategy').addClass('upwards3-strategy').removeClass('upwards2-strategy downwards3-strategy');
                        }
                    }
                }
            }
            if(height > 380){
                $('#platform').addClass('upwards0-strategy').removeClass('downwards0-strategy');   
                if(height > 420){
                    $('#platform').addClass('upwards1-strategy').removeClass('upwards0-strategy downwards1-strategy');  
                    if(height > 460){
                        $('#platform').addClass('upwards2-strategy').removeClass('upwards1-strategy downwards2-strategy'); 
                        if(height > 500){
                            $('#platform').addClass('upwards3-strategy').removeClass('upwards2-strategy downwards3-strategy');
                        }
                    }
                }
            }
            if(height > 460){
                $('#marketing').addClass('upwards0-strategy').removeClass('downwards0-strategy');   
                if(height > 500){
                    $('#marketing').addClass('upwards1-strategy').removeClass('upwards0-strategy downwards1-strategy');  
                    if(height > 530){
                        $('#marketing').addClass('upwards2-strategy').removeClass('upwards1-strategy downwards2-strategy'); 
                        if(height > 560){
                            $('#marketing').addClass('upwards3-strategy').removeClass('upwards2-strategy downwards3-strategy');
                        }
                    }
                }
            }
        } else {
            //upward scroll
            var height = $(window).scrollTop()
            var heightOfWindow = $(window).height();
            if(height < 580){
                $('#marketing').addClass('downwards3-strategy').removeClass('upwards3-strategy'); 
                if(height < 540){
                    $('#marketing').addClass('downwards2-strategy').removeClass('upwards2-strategy downwards3-strategy'); 
                    if(height < 500){
                        $('#marketing').addClass('downwards1-strategy').removeClass('upwards1-strategy downwards2-strategy'); 
                        if(height < 460){
                            $('#marketing').addClass('downwards0-strategy').removeClass('upwards0-strategy downwards1-strategy'); 
                        }
                    }
                }
            }
            if(height < 540){
                $('#platform').addClass('downwards3-strategy').removeClass('upwards3-strategy'); 
                if(height < 500){
                    $('#platform').addClass('downwards2-strategy').removeClass('upwards2-strategy downwards3-strategy'); 
                    if(height < 470){
                        $('#platform').addClass('downwards1-strategy').removeClass('upwards1-strategy downwards2-strategy'); 
                        if(height < 430){
                            $('#platform').addClass('downwards0-strategy').removeClass('upwards0-strategy downwards1-strategy'); 
                        }
                    }
                }
            }
            if(height < 410){
                $('#strategy').addClass('downwards3-strategy').removeClass('upwards3-strategy'); 
                if(height < 370){
                    $('#strategy').addClass('downwards2-strategy').removeClass('upwards2-strategy downwards3-strategy'); 
                    if(height < 340){
                        $('#strategy').addClass('downwards1-strategy').removeClass('upwards1-strategy downwards2-strategy'); 
                        if(height < 300){
                            $('#strategy').addClass('downwards0-strategy').removeClass('upwards0-strategy downwards1-strategy'); 
                        }
                    }
                }
            }

        }
        lastScrollTop = st;
    });
    //to call the function each time whenever a user scrolls the window

    $(window).scroll(function() {
        // for Navigation comes after scroll
        var secondaryNavigation = $('#secondary-navigation'), windows = $(this);
        if(windows.scrollTop() > 160){
            secondaryNavigation.addClass('translate-down').removeClass('translate-up');
        } else {
            secondaryNavigation.addClass('translate-up').removeClass('translate-down');
        }
    });
});

//bootstrap carousel image slider to slide the image
$(document).ready(function(){
    $('.carousel').carousel({
      interval: false,
      pause: ''
    });
    $('.carousel').off('keydown.bs.carousel');
});

//error validations for contact forms
$(document).ready(function () {
    //name is required
    $('#errorMsg').hide();
    var errorList = $('#errorList');
    var name = $("#name"),
        company = $("#company"),
        country = $("#country"),
        email = $("#email"),
        subject = $("#subject"),
        message = $("#message");


    $('#contactForm').submit(function (e) {
        e.preventDefault();
        //full name is required
        if (name.val() == '' || name.val() == null) {
            if (errorList.find('.errormessage-name').length == 0) {
                $('<li />', { html: 'Full name is required !', class: 'col-sm-6 errormessage-name' })
                .appendTo(errorList)
                .click(function () {
                    name.focus();
                })
                name.parent().addClass('has-error');
            }
        }
        else {
            if (name.parent().hasClass('has-error')) {
                name.parent().removeClass('has-error')
            };
            if (errorList.find('.errormessage-name').length > 0) {
                errorList.find('.errormessage-name').remove();
            }
        }
        //comapny name is required
        if (company.val() == '' || company.val() == null) {
            if (errorList.find('.errormessage-company').length == 0) {
                $('<li />', { html: 'Company name is required !', class: 'col-sm-6 errormessage-company' })
                .appendTo(errorList)
                .click(function () {
                    company.focus();
                })
                company.parent().addClass('has-error');
            }
        }
        else {
            if (company.parent().hasClass('has-error')) {
                company.parent().removeClass('has-error')
            };
            if (errorList.find('.errormessage-company').length > 0) {
                errorList.find('.errormessage-company').remove();
            }
        }
        //country is required
        if (country.val() == '' || country.val() == null) {
            if (errorList.find('.errormessage-country').length == 0) {
                $('<li />', { html: 'Country name is required !', class: 'col-sm-6 errormessage-country' })
                .appendTo(errorList)
                .click(function () {
                    country.focus();
                })
                country.parent().addClass('has-error');
            }
        }
        else {
            if (country.parent().hasClass('has-error')) {
                country.parent().removeClass('has-error')
            };
            if (errorList.find('.errormessage-country').length > 0) {
                errorList.find('.errormessage-country').remove();
            }
        }
        //subject is required
        if (subject.val() == '' || subject.val() == null) {
            if (errorList.find('.errormessage-subject').length == 0) {
                $('<li />', { html: 'Subject is required !', class: 'col-sm-6 errormessage-subject' })
                .appendTo(errorList)
                .click(function () {
                    subject.focus();
                })
                subject.parent().addClass('has-error');
            }
        }
        else {
            if (subject.parent().hasClass('has-error')) {
                subject.parent().removeClass('has-error')
            };
            if (errorList.find('.errormessage-subject').length > 0) {
                errorList.find('.errormessage-subject').remove();
            }
        }
        //message is required
        if (message.val() == '' || messgae.val() == null) {
            if (errorList.find('.errormessage-message').length == 0) {
                $('<li />', { html: 'Message is required !', class: 'col-sm-6 errormessage-message' })
                .appendTo(errorList)
                .click(function () {
                    message.focus();
                })
                message.parent().addClass('has-error');
            }
        }
        else {
            if (message.parent().hasClass('has-error')) {
                message.parent().removeClass('has-error')
            };
            if (errorList.find('.errormessage-message').length > 0) {
                errorList.find('.errormessage-message').remove();
            }
        }
        //Email is required
        if (email.val() == '' || email.val() == null) {
            if (errorList.find('.errormessage-email').length == 0) {
                var li = $('<li />', { html: 'Email is required !', class: 'col-sm-6 errormessage-email' });
                li.appendTo(errorList)
                .click(function () {
                    email.focus();
                })
                email.parent().addClass('has-error');
            }
        } else {
            var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            if (!re.test(email.val())) {
                if (errorList.find('.col-sm-6 errormessage-email').length == 0) {
                    errorList.find('.errormessage-email').text('Enter correct email address');
                    $('#errorMsg').show();
                }
            } else {
                if (email.parent().hasClass('has-error')) {
                    email.parent().removeClass('has-error')
                };
                if (errorList.find('.errormessage-email').length > 0) {
                    errorList.find('.errormessage-email').remove();
                    $('#errorMsg').hide();
                }
            }
        }
        
        if (errorList.children('li').length > 0) {
            $('#errorMsg').show();
            $('html, body').animate({
                scrollTop: 100
            }, 500);
        } else {
            $('#errorMsg').hide();   
        }
    });
});