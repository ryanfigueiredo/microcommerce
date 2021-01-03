class Category < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: true }, presence: true
end
