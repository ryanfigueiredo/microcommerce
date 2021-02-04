class CreateSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :settings do |t|
      t.string :commerce_name, default: "Mini E-commerce"
      t.string :header_color, default: "#ffffff"
      t.string :footer_color, default: "#ffffff"
      t.string :sidebar_color, default: "#4e73df"
      t.string :text_sidebar, default: "Mini e-commerce"
      t.string :short_text_sidebar, default: "ME"
      t.string :text_footer, default: "Miniecommerce"
      t.boolean :display_general_search, default: true

      t.timestamps
    end
  end
end
