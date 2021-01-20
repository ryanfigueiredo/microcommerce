import consumer from "./consumer"

consumer.subscriptions.create("CustomerOrderChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected to the CustomerOrderChannel!");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    let templateCustomerOrderItem = buildTemplateCustomerOrderItem(data.content)
    appendItemInCustomerOrderList(templateCustomerOrderItem)
    upadateAmountCUstomerOderList()
  }
});

var buildTemplateCustomerOrderItem = (customerOrderItemParams) => {
  let content = importNodeTemplate()
  let customerOrderItemTemplate = getCustomerOrderItemFromTemplate(content)
  updateTemplateCustomerOrderItem(customerOrderItemTemplate, customerOrderItemParams)

  return content
}

var importNodeTemplate = () => {
  let template = document.getElementById('customer-order-item-template')
  return document.importNode(template.content, true)
}

var getCustomerOrderItemFromTemplate = (content) => {
  return {
    deliveryAddress: content.getElementById('delivery-address'),
    wayOfPayment: content.getElementById('way-of-payment'),
    creditCard: content.getElementById('credit-card'),
    money: content.getElementById('money'),
    listProducts: content.getElementById('list-products'),
    totalValue: content.getElementById('total-value'),
    orderTime: content.getElementById('order-time'),
    linkToUpdateStatus: content.getElementById('link-to-update-status')
  }
}

var updateTemplateCustomerOrderItem = (customerOrderItemTemplate, customerOrderItemParams) => {
  customerOrderItemTemplate.deliveryAddress.innerHTML = customerOrderItemParams.delivery_address
  customerOrderItemTemplate.wayOfPayment.innerHTML = customerOrderItemParams.way_of_payment
  customerOrderItemParams.icon_way_of_payment === "credit_card" ? $(customerOrderItemTemplate.money).hide() : $(customerOrderItemTemplate.creditCard).hide()
  customerOrderItemTemplate.listProducts.innerHTML = customerOrderItemParams.list_products
  customerOrderItemTemplate.totalValue.innerHTML = 'Total: R$ ' + customerOrderItemParams.total_value
  $(customerOrderItemTemplate.orderTime).append(customerOrderItemParams.order_time)

  let urlUpdateStatus = $(customerOrderItemTemplate.linkToUpdateStatus).data('url')
  let urlUpdateStatusWithId = urlUpdateStatus.replace(/id/i, customerOrderItemParams.id)
  $(customerOrderItemTemplate.linkToUpdateStatus).attr('href', urlUpdateStatusWithId)
}

var appendItemInCustomerOrderList = (item) => {
  $('#no-item-customer-order').remove()
  $('#customer-order-list').prepend(item)

  setTimeout(function(){
    let lastElementPulse = $('.pulse').length - 1
    $($('.pulse')[lastElementPulse]).removeClass('pulse border-left-warning border-bottom-warning').addClass('border-left-primary');
  }, 30000);
}

var upadateAmountCUstomerOderList = () => {
  let elementCustomerOrderAmount = $('#customer-order-amount')
  elementCustomerOrderAmount.text(parseFloat(elementCustomerOrderAmount.text()) + 1)
}
