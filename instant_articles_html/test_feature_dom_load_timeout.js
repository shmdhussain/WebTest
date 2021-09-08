document.addEventListener('DOMContentLoaded', function(e) {
      document.querySelector('.t4').innerHTML = "This is t4 inline dom ready event";
    });

    document.addEventListener('load', function(e) {
      document.querySelector('.t5').innerHTML = "This is t5 inline dom load event";
    });
    setTimeout(function() {
      document.querySelector('.t6').innerHTML = "This is t6 tfrom set timeout";
    }, 15000);
