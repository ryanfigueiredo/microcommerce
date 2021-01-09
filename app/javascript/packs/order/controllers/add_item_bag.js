$(document).on('turbolinks:load', function() {
  handleClickAddProduct()
})

var handleClickAddProduct = () => {
  $('.add-product-to-bag').click(function() {
    let productTemplate = buildTemplateProduct(this)
    let productId = $(this).data('product-id')
    let productPrice = $(this).data('price')
    let productBag = $('#product-bag')

    appendProductToBag(productBag, productTemplate, productId, productPrice)
    addAmountToBag()
    changeMessageTextBag()
    $('#bag-total-value').text(calculateValueTotalBag().toFixed(2))
  })
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
    name: content.getElementById('name-product'),
    price: content.getElementById('price-product'),
    img: content.getElementById('img-product'),
    amount: content.getElementById('amount-product'),
    productId: content.getElementById('product-id')
  }
}

var getProductParams = (product) => {
  return {
    name: $(product).data('name'),
    price: $(product).data('price'),
    img: $(product).data('img'),
    productId: $(product).data('productId')
  }
}

var updateTemplateProduct = (productTemplate, productParams) => {
  productTemplate.name.innerHTML = productParams.name
  productTemplate.price.innerHTML = productParams.price
  productTemplate.img.src = productParams.img
  productTemplate.amount.innerHTML = parseInt(productTemplate.amount.innerHTML) + 1

  productTemplate.productId.id = productParams.productId
  productTemplate.price.id = productParams.productId + '-price'
  productTemplate.amount.id = productParams.productId + '-amount'
}

var appendProductToBag = (productBag, productTemplate, productId, productPrice) => {
  if ($(productBag).children('#' + productId).length < 1) {
    $('#product-bag').append(productTemplate)
  } else {
    let bagProduct = getBagProductParams(productId)
    updateBagProduct(bagProduct, productPrice)
  }
}

var getBagProductParams = (productId) => {
  return {
    price: $('#' + productId + '-price')[0],
    amount: $('#' + productId + '-amount')[0]
  }
}

var updateBagProduct = (bagProduct, price) => {
  let totalPrice = parseFloat(bagProduct.price.innerHTML) + parseFloat(price)
  bagProduct.price.innerHTML = totalPrice.toFixed(2)
  bagProduct.amount.innerHTML = parseInt(bagProduct.amount.innerHTML) + 1
}

var addAmountToBag = () => {
  let bagAmountItems = $('#bag-amount-items')
  let value = parseInt(bagAmountItems.text())

  bagAmountItems.text(value += 1)
}

var changeMessageTextBag = () => {
  $('#message-bag').hide()
  $('#make-wish').show()
}

var calculateValueTotalBag = () => {
  return $.map($('.price-product'), element => parseFloat($(element).text())).reduce((accumulator, currentValue) => accumulator + currentValue)
}
