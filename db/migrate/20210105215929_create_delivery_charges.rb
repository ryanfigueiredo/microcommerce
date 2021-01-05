class CreateDeliveryCharges < ActiveRecord::Migration[6.0]
  def change
    create_table :delivery_charges do |t|
      t.string :county, precision: 10, scale: 2, null: false
      t.decimal :price, null: false

      t.timestamps
    end
  end
end
