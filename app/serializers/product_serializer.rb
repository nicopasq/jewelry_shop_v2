class ProductSerializer < ActiveModel::Serializer
  attributes :id, :product_name, :product_type, :price, :in_stock
end
