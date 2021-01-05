class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.decimal :price, precision: 10, scale: 2, null: false
      t.string :name, null: false
      t.string :description
      t.references :category, foreign_key: true, null: false

      t.timestamps
    end
  end
end
