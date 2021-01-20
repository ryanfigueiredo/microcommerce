class AddItemsInStockToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :items_in_stock, :integer, null: false, default: 1
  end
end
