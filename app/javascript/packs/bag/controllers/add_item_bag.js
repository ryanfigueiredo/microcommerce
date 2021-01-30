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
    updateItemsInStock(this)
    blockAddItemInBag(this, productId)
  })
}

var updateBagProduct = (productId, productPrice) => {
  let elementProductAmount = $('#' + productId + '-amount')
  let elementSizeItems = $('#' + productId + '-size-items')
  elementProductAmount.text(parseInt(elementProductAmount.text()) + 1)
  elementSizeItems.text(parseInt(elementSizeItems.text()) + 1)

  let elementProductPrice = $('#' + productId + '-price')
  elementProductPrice.text((parseFloat(elementProductPrice.text()) + parseFloat(productPrice)).toFixed(2))

  let elementProduct = $('#' + productId)
  elementProduct.data('price', elementProductPrice.text())
  elementProduct.data('amount', elementSizeItems.text())
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
    id: $(product).data('id'),
    itemsInStock: $(product).data('itemsInStock')
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

  productTemplate.btnRemoveProduct.setAttribute('data-product-id', '#' + productParams.productId)

  productTemplate.productId.setAttribute('data-amount', 1)
  productTemplate.productId.setAttribute('data-price', productParams.price)
  productTemplate.productId.setAttribute('data-id', productParams.id)
  productTemplate.productId.setAttribute('data-items-in-stock', productParams.itemsInStock)
}

var calculateValueTotalBag = (className) => {
  return $.map($(className), element => parseFloat($(element).text())).reduce((accumulator, currentValue) => accumulator + currentValue)
}

var changeMessageTextBag = () => {
  $('#message-bag').hide()
  $('#make-a-customer-order').show()
}

var updateItemsInStock = (btnAdd) => {
  let itemsInStock = $(btnAdd).data('items-in-stock')
  let itemsInStockUpdated = itemsInStock - 1
  $(btnAdd).data('items-in-stock', itemsInStockUpdated)
  $(btnAdd).siblings().data('items-in-stock', itemsInStockUpdated)
}

var blockAddItemInBag = (btnAdd, productId) => {
  let itemsInStock = $(btnAdd).data('items-in-stock')
  if(itemsInStock === 0) {
    btnAdd.disabled = true
    blockImageItem(productId)
  }
}

var blockImageItem = (productId) => {
  $('#image-' + productId).css('opacity', .5)
  $('#image-' + productId).children('.no-items-in-stock').show()
}
