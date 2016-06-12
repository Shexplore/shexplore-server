'use strict';

$("#login-submit").click(function () {
  $("#login-form").submit();
});
$('#login-form').keypress(function(e){
      if (e.which == 13) {
        $(this).submit();
      }
});