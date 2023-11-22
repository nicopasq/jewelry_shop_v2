class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.string :card_number
      t.integer :cvv
      t.string :card_holder
      t.string :street_address
      t.integer :apt_number
      t.integer :zip_code
      t.string :city

      t.timestamps
    end
  end
end
