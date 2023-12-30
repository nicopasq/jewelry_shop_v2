class OrderSerializer < ActiveModel::Serializer
    has_many :order_products
    attributes :id, :user_id, :first_name, :last_name, :card_number, :expiration, :cvv, :state, :city, :street_address, :apt_number, :zip_code, :order_products, :order_number, :holder_first_name, :holder_last_name, :created_at
  end
  