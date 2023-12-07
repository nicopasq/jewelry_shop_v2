class ProductSerializer < ActiveModel::Serializer
  attributes :id, :product_name, :image_path, :product_type, :price, :in_stock
end
