class OrderProductSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :user_id, :order_id, :quantity, :in_cart, :product, :size
end
