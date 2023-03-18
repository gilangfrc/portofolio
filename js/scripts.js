$(function () {
    $('#to-top').hide();

    $("#to-top").click(function () {
      $("html, body").animate({
          scrollTop: '0px'
      }, 1);
    });

    ScrollReveal().reveal('#about .title', { 
      distance: '120%',
      origin: 'left',
      opacity: null,
      delay: 200,
      reset: true,
      useDelay: 'onload'
    });
    
    ScrollReveal().reveal('#project .title', { 
      distance: '120%',
      origin: 'right',
      opacity: null,
      reset: true,
      useDelay: 'onload'
    });
     
    ScrollReveal().reveal('#contact .title', { 
      distance: '120%',
      origin: 'left',
      opacity: null,
      reset: true,
      useDelay: 'onload'
    });
    
    ScrollReveal().reveal('#project .card', { 
      useDelay: 'onload', 
      reset: true,
      interval: 500,
      origin: 'left',
      distance: '120%', 
    });

    $('#download').click(function (e) { 
      e.preventDefault();
      window.open('/CV.pdf', '_blank');
    });

    $('#form-contact').submit(function (e) { 
      e.preventDefault();
      
      $.ajax({
        type: "POST",
        url: "/send",
        data: $(this).serialize(),
        dataType: "JSON",
        success: function (response) {
          if (response.status == 'success') {
            const toast = new bootstrap.Toast($('#toast'));
            toast.show();
          }
        }
      });
    });
      
    function getPosition(element) {
      var xPosition = 0, yPosition = 0;

      while(element) {
          xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
          element = element.offsetParent;
      }
      return { x: xPosition, y: yPosition };
    }

    var prevScrollpos = window.pageYOffset;

    $(window).scroll(function() {
      let staticPosition = getPosition(document.getElementById('home')).y;
      let currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos && this.scrollY - staticPosition > 90) {
        $('#navbar').css('top', '0');
      }
      else {
        $('#navbar').css('top', '-100%');
      }

      prevScrollpos = currentScrollPos;
      
      if (this.scrollY - staticPosition > 90)  {
        // $('nav').css('top', '0');
        $('.arrow-down h1').removeClass('animate__bounce');
        $('#to-top').show().fadeIn();
      }
      else {
        // $('nav').css('top', '-60px');
        $('.arrow-down h1').addClass('animate__bounce');
        $('#to-top').fadeOut().hide();
      }
    });
});