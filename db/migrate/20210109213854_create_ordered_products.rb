class CreateOrderedProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :ordered_products do |t|
      t.decimal :total_value, null: false
      t.references :product, null: false, foreign_key: true
      t.integer :amount, null: false
      t.references :customer_order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
