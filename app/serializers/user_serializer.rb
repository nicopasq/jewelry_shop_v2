class UserSerializer < ActiveModel::Serializer
  has_many :order_products
  has_many :orders
  has_many :products, through: :order_products
  attributes :id, :username, :created_at
end
