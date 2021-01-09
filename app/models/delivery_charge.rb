class DeliveryCharge< ApplicationRecord
  include PriceableConcern

  validates :county, uniqueness: { case_sensitive: true }, presence: true
  validates :price,
    presence: true,
    numericality: { greater_than: 0, less_than: 1000000 }

  # has_many :requests
end
