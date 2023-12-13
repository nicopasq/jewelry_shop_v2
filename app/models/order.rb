class Order < ApplicationRecord
    belongs_to :user
    has_many :order_products

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :card_number, presence: true, length: {is:16}
    validates :expiration, presence: true
    validates :cvv, presence: true, length: {is: 3}, numericality:{only_integer:true}
    validates :state, presence: true
    validates :city, presence: true
    validates :street_address, presence: true
    validates :zip_code, presence: true, numericality:{only_integer:true}
end
