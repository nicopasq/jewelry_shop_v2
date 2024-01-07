class OrderProduct < ApplicationRecord
    belongs_to :user
    belongs_to :product
    has_one :order

    validates :product_id, presence:true
    validates :user_id, presence:true
    validates :quantity, presence:true, numericality:{greater_than: 0}
    validates :ring, presence:true, allow_blank: true
    validates :in_cart, presence:true, on: :create
end
