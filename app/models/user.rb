class User < ApplicationRecord
    has_secure_password
    has_many :orders
    has_many :likes
    has_many :order_products
    has_many :products, through: :order_products

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
