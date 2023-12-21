class UserSerializer < ActiveModel::Serializer
  has_many :order_products
  has_many :orders
  # has_many :order_products, through: :orders
  attributes :id, :username, :created_at
end
