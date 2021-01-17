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
    listProducts: content.getElementById('list-products'),
  }
}

var updateTemplateCustomerOrderItem = (customerOrderItemTemplate, customerOrderItemParams) => {
  customerOrderItemTemplate.deliveryAddress.innerHTML = customerOrderItemParams.delivery_address
  customerOrderItemTemplate.wayOfPayment.innerHTML = customerOrderItemParams.way_of_payment
  customerOrderItemTemplate.listProducts.innerHTML = customerOrderItemParams.list_products
}

var appendItemInCustomerOrderList = (item) => {
  $('#no-item-customer-order').remove()
  $('#customer-order-list').append(item)
}
