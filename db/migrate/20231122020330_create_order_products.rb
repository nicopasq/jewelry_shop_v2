class CreateOrderProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :order_products do |t|
      t.integer :product_id
      t.integer :user_id
      t.integer :order_id
      t.integer :quantity
      t.boolean :in_cart

      t.timestamps
    end
  end
end
