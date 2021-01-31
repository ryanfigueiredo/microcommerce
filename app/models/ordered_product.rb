class OrderedProduct < ApplicationRecord
  validate :enough_in_stock_items?

  validates :product_id, presence: true
  validates :amount, presence: true
  validates :total_value,
    presence: true,
    numericality: { greater_than: 0, less_than: 1000000 }

  belongs_to :product
  belongs_to :customer_order

  def enough_in_stock_items?
    product = Product.find(product_id)

    if amount > product.items_in_stock
      error_msg = " #{product.name}, apenas #{product.items_in_stock} em estoque"
      errors.add(:product_id, error_msg)
    end
  end
end
