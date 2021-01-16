$(document).on('turbolinks:load', function() {
  handleClickRemoveProduct()
  handleRemoveItemsInBag()
})

var handleClickRemoveProduct = () => {
  $('.remove-product-to-bag').click(function() {
    let productId = $(this).data('product-id')
    let productPrice = $(this).data('price')
    let elementProductAmount = $(productId + '-amount')
    let productAmount = parseInt(elementProductAmount.text())

    if(productAmount > 1) {
      updateBagProduct(productId, productPrice)
    } else if (productAmount == 1) {
      $(productId).remove()
      $(productId + '-size-items').hide()
    }

    verifyAndCalculatePriceAndAmountTheProducts()
  })
}

var updateBagProduct = (productId, productPrice) => {
  let elementProductAmount = $(productId + '-amount')
  let elementSizeItems = $(productId + '-size-items')
  elementProductAmount.text(parseInt(elementProductAmount.text()) - 1)
  elementSizeItems.text(parseInt(elementSizeItems.text()) - 1)

  let elementProductPrice = $(productId + '-price')
  elementProductPrice.text((parseFloat(elementProductPrice.text()) - parseFloat(productPrice)).toFixed(2))

  let elementProduct = $(productId)
  elementProduct.data('price', elementProductPrice.text())
  elementProduct.data('amount', elementSizeItems.text())
}

var verifyAndCalculatePriceAndAmountTheProducts = () => {
  if ($('#product-bag').children().length === 0 && $('#customer-order-items').children().length === 0) {
    $('#bag-amount-items').text(0)
    $('#bag-total-value').text(0)
    $('#customer-order-total-value').text(0)
    changeMessageTextBag()
    $('#submit-customer-order').attr('disabled', true)
    $('#no-items-bag').show()
  } else {
    $('#bag-amount-items').text(calculateValueTotalBag('.product-amount-bag'))
    $('#bag-total-value').text(calculateValueTotalBag('.product-price-bag').toFixed(2))
    $('#customer-order-total-value').text(calculateValueTotalBag('.product-price-bag').toFixed(2))
  }
}

var calculateValueTotalBag = (className) => {
  return $.map($(className), element => parseFloat($(element).text())).reduce((accumulator, currentValue) => accumulator + currentValue)
}

var changeMessageTextBag = () => {
  $('#message-bag').show()
  $('#make-a-customer-order').hide()
}

var handleRemoveItemsInBag = () => {
  $('body').on('click', '.remove-item', function() {
    let productId = $(this).data('product-id')
    $(productId).remove()
    $(productId + '-size-items').text(1).hide()

    verifyAndCalculatePriceAndAmountTheProducts()
  })
}
