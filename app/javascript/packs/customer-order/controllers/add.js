$(document).on('turbolinks:load', function() {
  handleOpenModalMakeACustomerOrder()
  handleCloseModalMakeAcustomerOrder()
})

var handleOpenModalMakeACustomerOrder = () => {
  $('#make-a-customer-order').click(function() {
    $('#customer-order-items').append($('#product-bag').children())
    $('#customer-order-total-value').text($('#bag-total-value').text())
    $('#submit-customer-order').attr('disabled', false)
    $('#no-items-bag').hide()
  })
}

var handleCloseModalMakeAcustomerOrder = () => {
  $('#close-customer-order-modal').click(function() {
    $('#product-bag').append($('#customer-order-items').children())
    $('#customer-order-total-value').text(0)
  })
}
