$(function () {
  $('body').append('<a href="javascript:;" id="back-to-top"><i class="glyphicon glyphicon-chevron-up"></i></a>');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#back-to-top').fadeIn();
    }
    else {
      $('#back-to-top').fadeOut();
    }
  });
  $('#back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 100);
    return false;
  });
});
