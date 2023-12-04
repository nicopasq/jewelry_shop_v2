class UserSerializer < ActiveModel::Serializer
  has_many :order_products
  attributes :id, :username, :created_at
end
