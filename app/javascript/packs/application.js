require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

require('jquery')
require('popper.js')
require('bootstrap/dist/js/bootstrap.bundle')
require('jquery.easing/jquery.easing')
require('@fortawesome/fontawesome-free/js/all')
require('imports-loader?define=>false!datatables.net')(window, $)
require('imports-loader?define=>false!datatables.net-bs4')(window, $)
require('./shared/sb-admin-2')

require('./shared/datatables')
require('./shared/form')
require('./bag/index')
require('./customer-order/index')

$(document).on('turbolinks:load', function(){
  $('.general-alert').delay(2800).slideUp(500, function(){
    $('.general-alert').alert('close');
  });
});
