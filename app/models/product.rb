class Product < ApplicationRecord
  include PriceableConcern

  validates :name, uniqueness: { case_sensitive: true }, presence: true
  validates :price,
    presence: true,
    numericality: { greater_than: 0, less_than: 1000000 }
  validates :promotional_price,
    numericality: { greater_than: 0, less_than: 1000000 }, allow_nil: true
  validates :picture, presence: true
  validates :items_in_stock, presence: true

  has_one_attached :picture, dependent: :destroy
  belongs_to :category
end
