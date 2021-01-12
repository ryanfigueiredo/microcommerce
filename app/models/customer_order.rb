class CustomerOrder < ApplicationRecord
  validates :delivery_address, presence: true
  validates :delivery_charge_id, presence: true
  validates :way_of_payment, presence: true
  validates :total_value,
    presence: true,
    numericality: { greater_than: 0, less_than: 1000000 }

  enum way_of_payment: { credit_card: 0, money: 1 }

  has_many :ordered_products
end
