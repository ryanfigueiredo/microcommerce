class Category < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: true }, presence: true
  has_many :products
end
