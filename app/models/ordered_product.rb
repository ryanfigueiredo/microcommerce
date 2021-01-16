class OrderedProduct < ApplicationRecord
  validates :product_id, presence: true
  validates :amount, presence: true
  validates :total_value,
    presence: true,
    numericality: { greater_than: 0, less_than: 1000000 }

  belongs_to :product
  belongs_to :customer_order
end
