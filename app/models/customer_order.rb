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

  after_create :update_items_in_stock_from_products

  def ordered_products_amount_and_names
    self.ordered_products.map{ |op| "#{op.amount} #{op.product.name}" }
  end

  def update_items_in_stock_from_products
    product_ids = self.ordered_products.pluck(:product_id)
    product_items_in_stocks = Product.where(id: product_ids).pluck(:items_in_stock)
    product_amounts = self.ordered_products.pluck(:amount)
    rest_items_in_stock = product_items_in_stocks.zip(product_amounts).map do |product_items_in_stock, product_amount|
      { items_in_stock: product_items_in_stock - product_amount }
    end

    Product.update(product_ids, rest_items_in_stock)
  end
end
