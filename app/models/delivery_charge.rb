class DeliveryCharge< ApplicationRecord
  validates :county, uniqueness: { case_sensitive: true }, presence: true
  validates :price,
    presence: true,
    format: { with: /\A\d+(?:\.\d{2})?\z/ },
    numericality: { greater_than: 0, less_than: 1000000 }

  # has_many :requests
end
