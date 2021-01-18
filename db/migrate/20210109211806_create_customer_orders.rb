class CreateCustomerOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :customer_orders do |t|
      t.decimal :total_value, null: false
      t.string :delivery_address, null: false
      t.references :delivery_charge, foreign_key: true, null: false
      t.integer :way_of_payment, null: false
      t.integer :status, null: false, default: 0
      t.string :observation
      t.decimal :change_for

      t.timestamps
    end
  end
end
