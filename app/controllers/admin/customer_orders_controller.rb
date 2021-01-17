class Admin::CustomerOrdersController < ApplicationController
  def index
    @customer_orders = CustomerOrder.today.order(:created_at).includes(ordered_products: :product)
  end

  def create
    @customer_order = CustomerOrder.new(customer_order_params)

    respond_to do |format|
      if @customer_order.save
        ActionCable.server.broadcast "customer_order_channel", content: set_customer_order_to_list
        format.html { redirect_to root_path, notice: 'Pedido enviado com sucesso.' }
      else
        format.html { redirect_to root_path }
      end
    end
  end

  private

  def customer_order_params
    params.require(:customer_order).permit(
      :total_value,
      :delivery_address,
      :delivery_charge_id,
      :way_of_payment,
      :observation,
      :change_for,
      ordered_products_attributes: [
        :total_value,
        :product_id,
        :amount,
      ]
    )
  end

  def set_customer_order_to_list
    {
      delivery_address: @customer_order.delivery_address,
      way_of_payment: CustomerOrder.human_enum_name(:way_of_payment, @customer_order.way_of_payment),
      list_products: @customer_order.ordered_products_amount_and_names.to_sentence,
      change_for: @customer_order.change_for
    }
  end
end
