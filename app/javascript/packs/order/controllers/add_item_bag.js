$(document).on('turbolinks:load', function() {
  handleClickAddProduct()
})

var handleClickAddProduct = () => {
  $('.add-product-to-bag').click(function() {
    let productId = $(this).data('product-id')
    let productPrice = $(this).data('price')

    if($('#' + productId).length === 0) {
      let productTemplate = buildTemplateProduct(this)
      $('#product-bag').append(productTemplate)
    } else {
      updateBagProduct(productId, productPrice)
    }

    $('#bag-amount-items').text(calculateValueTotalBag('.product-amount-bag'))
    $('#bag-total-value').text(calculateValueTotalBag('.product-price-bag').toFixed(2))

    $('#' + productId + '-size-items').show()

    changeMessageTextBag()
  })
}

var updateBagProduct = (productId, productPrice) => {
  let elementProductAmount = $('#' + productId + '-amount')
  let elementSizeItems = $('#' + productId + '-size-items')
  elementProductAmount.text(parseInt(elementProductAmount.text()) + 1)
  elementSizeItems.text(parseInt(elementSizeItems.text()) + 1)

  let elementProductPrice = $('#' + productId + '-price')
  elementProductPrice.text((parseFloat(elementProductPrice.text()) + parseFloat(productPrice)).toFixed(2))
}

var buildTemplateProduct = (product) => {
  let content = importNodeTemplate()
  let productTemplate = getProductFromTemplate(content)
  let productParams = getProductParams(product)
  updateTemplateProduct(productTemplate, productParams)

  return content
}

var importNodeTemplate = () => {
  let template = document.getElementById('product-template')
  return document.importNode(template.content, true)
}

var getProductFromTemplate = (content) => {
  return {
    productId: content.getElementById('product-id'),
    name: content.getElementById('name-product'),
    price: content.getElementById('price-product'),
    amount: content.getElementById('amount-product'),
    img: content.getElementById('img-product'),
    btnRemoveProduct: content.getElementById('remove-item')
  }
}

var getProductParams = (product) => {
  return {
    productId: $(product).data('productId'),
    name: $(product).data('name'),
    price: $(product).data('price'),
    img: $(product).data('img'),
  }
}

var updateTemplateProduct = (productTemplate, productParams) => {
  productTemplate.name.innerHTML = productParams.name
  productTemplate.price.innerHTML = productParams.price
  productTemplate.img.src = productParams.img

  productTemplate.productId.id = productParams.productId
  productTemplate.price.id = productParams.productId + '-price'
  productTemplate.amount.id = productParams.productId + '-amount'

  productTemplate.amount.classList.add('product-amount-bag')
  productTemplate.price.classList.add('product-price-bag')
}

var calculateValueTotalBag = (className) => {
  return $.map($(className), element => parseFloat($(element).text())).reduce((accumulator, currentValue) => accumulator + currentValue)
}

var changeMessageTextBag = () => {
  $('#message-bag').hide()
  $('#make-wish').show()
}
