class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.string :order_number
      t.string :first_name
      t.string :last_name
      t.string :holder_first_name
      t.string :holder_last_name
      t.string :card_number
      t.string :expiration
      t.integer :cvv
      t.string :state
      t.string :city
      t.string :street_address
      t.integer :apt_number
      t.integer :zip_code

      t.timestamps
    end
  end
end
