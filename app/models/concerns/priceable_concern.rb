module PriceableConcern
  extend ActiveSupport::Concern

  def price=(price)
    super(format("%.2f", price)) if price.present?
  end

  def promotional_price=(price)
    super(format("%.2f", price)) if price.present?
  end
end
