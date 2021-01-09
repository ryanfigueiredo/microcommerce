class Product < ApplicationRecord
  include PriceableConcern

  validates :name, uniqueness: { case_sensitive: true }, presence: true
  validates :price,
    presence: true,
    numericality: { greater_than: 0, less_than: 1000000 }
  validates :promotional_price,
    numericality: { greater_than: 0, less_than: 1000000 }

  has_one_attached :picture
  has_one :category

  def promotional_price=(price)
    format_price(price)
  end
end
