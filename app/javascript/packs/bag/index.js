require('./controllers/add_item_bag')
require('./controllers/remove_item_bag')

$(document).on('turbolinks:load', function() {
  displayChangeFor()
})

var displayChangeFor = () => {
  $('#customer_order_way_of_payment').change(function() {
    if($('#customer_order_way_of_payment option:selected').val() == 'money') {
      $('#form-group-money').show()
    } else {
      $('#form-group-money').hide()
    }
  })
}
