$(document).on('turbolinks:load', function() {
  handleClickRemoveProduct()
})

var handleClickRemoveProduct = () => {
  $('.remove-product-to-bag').click(function() {
    let productId = $(this).data('product-id')
    let productPrice = $(this).data('price')
    let ElementBagAmountItems = $('#bag-amount-items')
    let ElementProductAmount = $(productId + '-amount')
    let productAmount = parseInt(ElementProductAmount.text())

    if(productAmount > 1) {
      removeItemInBag(ElementProductAmount, productAmount, productId, productPrice)
      $('#bag-total-value').text(calculateValueTotalBag().toFixed(2))
    } else if (productAmount === 1) {
      $(productId).remove()
      $('#bag-total-value').text(calculateValueTotalBag().toFixed(2))
    }

    let bagAmountItemsValue = parseInt(ElementBagAmountItems.text())
    if(bagAmountItemsValue > 0 && productAmount > 0) {
      ElementBagAmountItems.text(bagAmountItemsValue - 1)
      changeMessageTextBag()
      $('#bag-total-value').text(calculateValueTotalBag().toFixed(2))
    }
    if(parseInt(ElementBagAmountItems.text()) === 0) {
      calculateValueTotalBag()
    }
  })
}

var removeItemInBag = (ElementProductAmount, productAmount, productId, productPrice) => {
  let ElementProductPrice = $(productId + '-price')
  let ElementProductPriceValue = parseFloat(ElementProductPrice.text())
  let totalPrice = ElementProductPriceValue - productPrice

  ElementProductPrice.text(totalPrice.toFixed(2))
  ElementProductAmount.text(productAmount - 1)
}

var changeMessageTextBag = () => {
  $('#message-bag').show()
  $('#make-wish').hide()
}

var calculateValueTotalBag = () => {
  if ($('.price-product').length === 0) {
    return 0
  } else {
    return $.map($('.price-product'), element => parseFloat($(element).text())).reduce((accumulator, currentValue) => accumulator + currentValue)
  }
}
