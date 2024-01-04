class OrderProduct < ApplicationRecord
    belongs_to :user
    belongs_to :product
    has_many :orders

    validates :quantity, presence:true, numericality:{greater_than: 0}
    validates :user_id, presence:true
    validates :product_id, presence:true
end
