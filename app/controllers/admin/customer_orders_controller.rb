class Admin::CustomerOrdersController < ApplicationController
  def index
    @customer_orders = CustomerOrder.order(:created_at)
  end

  def create
  end

  private

  def set_customer_order_params
    params.require(:customer_order).permit(:total_value, :delivery_address, :delivery_charge_id, :way_of_payment, :observation, :change_for)
  end
end
