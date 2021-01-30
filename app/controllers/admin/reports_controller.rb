module Admin
  class ReportsController < ApplicationController
    def index
      @customer_orders = CustomerOrder.where(status: :sent).order(:created_at).includes(ordered_products: :product)
    end
  end
end
