class ApplicationController < ActionController::Base
  def format_price(price)
    format("%.2f", price) if price.present?
  end
end
