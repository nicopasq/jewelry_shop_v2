class UserSerializer < ActiveModel::Serializer
  has_many :order_products
  has_many :orders

  attributes :id, :username, :created_at
end
