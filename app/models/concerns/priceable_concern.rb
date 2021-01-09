module PriceableConcern
  extend ActiveSupport::Concern

  def format_price(price)
    format("%.2f", price)
  end

  def price=(price)
    super(format("%.2f", price))
  end
end
