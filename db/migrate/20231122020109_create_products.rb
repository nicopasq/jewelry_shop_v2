class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :product_name
      t.string :image_path
      t.string :product_type
      t.integer :price
      t.boolean :in_stock

      t.timestamps
    end
  end
end
