class Product < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: true }, presence: true
  validates :price,
    presence: true,
    format: { with: /\A\d+(?:\.\d{2})?\z/ },
    numericality: { greater_than: 0, less_than: 1000000 }
  validates :promotional_price,
    format: { with: /\A\d+(?:\.\d{2})?\z/ },
    numericality: { greater_than: 0, less_than: 1000000 }

  has_one_attached :picture
  has_one :category
end
