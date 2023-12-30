class User < ApplicationRecord
    has_secure_password
    has_many :orders
    has_many :order_products

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
