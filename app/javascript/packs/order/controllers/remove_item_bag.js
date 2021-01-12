$(document).on('turbolinks:load', function() {
  handleClickRemoveProduct()
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
      changeMessageTextBag()
    }

    $('#bag-amount-items').text(calculateValueTotalBag('.product-amount-bag'))
    $('#bag-total-value').text(calculateValueTotalBag('.product-price-bag').toFixed(2))
  })
}

var updateBagProduct = (productId, productPrice) => {
  let elementProductAmount = $(productId + '-amount')
  let elementSizeItems = $(productId + '-size-items')
  elementProductAmount.text(parseInt(elementProductAmount.text()) - 1)
  elementSizeItems.text(parseInt(elementSizeItems.text()) - 1)

  let elementProductPrice = $(productId + '-price')
  elementProductPrice.text((parseFloat(elementProductPrice.text()) - parseFloat(productPrice)).toFixed(2))
}

var calculateValueTotalBag = (className) => {
  if ($('#product-bag').children().length === 0) {
    return 0
  } else {
    return $.map($(className), element => parseFloat($(element).text())).reduce((accumulator, currentValue) => accumulator + currentValue)
  }
}

var changeMessageTextBag = () => {
  $('#message-bag').show()
  $('#make-wish').hide()
}
