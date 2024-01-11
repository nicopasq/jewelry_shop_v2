class Product < ApplicationRecord
    has_many :order_products
    has_many :likes
    has_many :users, through: :order_products

    validates :product_name, presence: true
    validates :product_type, presence: true
    validates :price, presence: true
    validates :in_stock, presence: true
end
