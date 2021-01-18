class CustomerOrder < ApplicationRecord
  validates :delivery_address, presence: true
  validates :delivery_charge_id, presence: true
  validates :way_of_payment, presence: true
  validates :total_value,
    presence: true,
    numericality: { greater_than: 0, less_than: 1000000 }
  validates :change_for, numericality: { greater_than: 0, less_than: 1000000 }, allow_nil: true

  has_many :ordered_products, dependent: :destroy
  accepts_nested_attributes_for :ordered_products

  enum way_of_payment: { credit_card: 0, money: 1 }
  enum status: { waiting_for_shipment: 0, sent: 1 }

  scope :today, -> { where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day) }

  def ordered_products_amount_and_names
    self.ordered_products.map{ |op| "#{op.amount} #{op.product.name}" }
  end
end
