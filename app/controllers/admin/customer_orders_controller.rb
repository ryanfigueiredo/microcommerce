class Admin::CustomerOrdersController < ApplicationController
  def create
  end

  private

  def set_customer_order_params
    params.require(:customer_orders).permit(:total_value, :delivery_address, :delivery_charge_id, :way_of_payment, :observation, :change_for)
  end
end
