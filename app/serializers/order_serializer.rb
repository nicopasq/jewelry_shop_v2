class OrderSerializer < ActiveModel::Serializer
    has_many :order_products
    attributes :id, :user_id, :first_name, :last_name, :card_number, :expiration, :cvv, :state, :city, :street_address, :apt_number, :zip_code, :order_products
  end
  