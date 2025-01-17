# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_03_023054) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "customer_orders", force: :cascade do |t|
    t.decimal "total_value", null: false
    t.string "delivery_address", null: false
    t.bigint "delivery_charge_id", null: false
    t.integer "way_of_payment", null: false
    t.integer "status", default: 0, null: false
    t.string "observation"
    t.decimal "change_for"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["delivery_charge_id"], name: "index_customer_orders_on_delivery_charge_id"
  end

  create_table "delivery_charges", force: :cascade do |t|
    t.string "county", null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "ordered_products", force: :cascade do |t|
    t.decimal "total_value", null: false
    t.bigint "product_id", null: false
    t.integer "amount", null: false
    t.bigint "customer_order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["customer_order_id"], name: "index_ordered_products_on_customer_order_id"
    t.index ["product_id"], name: "index_ordered_products_on_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.decimal "price", precision: 10, scale: 2, null: false
    t.string "name", null: false
    t.string "description"
    t.bigint "category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "promotional_price", precision: 10, scale: 2
    t.integer "items_in_stock", default: 1, null: false
    t.index ["category_id"], name: "index_products_on_category_id"
  end

  create_table "settings", force: :cascade do |t|
    t.string "commerce_name", default: "Mini E-commerce"
    t.string "header_color", default: "#ffffff"
    t.string "footer_color", default: "#ffffff"
    t.string "sidebar_color", default: "#4e73df"
    t.string "text_sidebar", default: "Mini e-commerce"
    t.string "short_text_sidebar", default: "ME"
    t.string "text_footer", default: "Miniecommerce"
    t.boolean "display_general_search", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "customer_orders", "delivery_charges"
  add_foreign_key "ordered_products", "customer_orders"
  add_foreign_key "ordered_products", "products"
  add_foreign_key "products", "categories"
end
