require('./controllers/add')

$(document).on('turbolinks:load', function() {
  displayChangeFor()
  handleSubmitCustomerOrder()
})

var displayChangeFor = () => {
  $('#customer_order_way_of_payment').change(function() {
    if($('#customer_order_way_of_payment option:selected').val() == 'money') {
      $('#form-group-money').show()
      $('#customer_order_change_for').attr('disabled', false)
    } else {
      $('#form-group-money').hide()
      $('#customer_order_change_for').attr('disabled', true)
    }
  })
}

var handleSubmitCustomerOrder = () => {
  $('#submit-customer-order').click(function() {
    $('.ordered-products-params').remove()
    $('#customer_order_total_value').val($('#customer-order-total-value').text())
    buildOrderedProductParams()
  })
}

var buildOrderedProductParams = () => {
  $('.bag-item').each((index, element) => {
    let inputPrice = buildInputHidden($(element).data('price'), 'customer_order[ordered_products_attributes][' + index + '][total_value]')
    let inputAmount = buildInputHidden($(element).data('amount'), 'customer_order[ordered_products_attributes][' + index + '][amount]')
    let inputId = buildInputHidden($(element).data('id'), 'customer_order[ordered_products_attributes][' + index + '][product_id]')
    $('#new_customer_order').append(inputPrice)
    $('#new_customer_order').append(inputAmount)
    $('#new_customer_order').append(inputId)
  })
}

var buildInputHidden = (value, name) => {
  let input = document.createElement('input')
  input.type = 'hidden'
  input.name = name
  input.value = value
  input.classList.add('ordered-products-params')
  return input
}
