class Order < ApplicationRecord
    belongs_to :user
    has_many :order_products

    validates :card_number, presence: true
    validates :cvv, presence: true, length: {is: 3}, numericality:{only_integer:true}
    validates :card_holder, presence: true
    validates :street_address, presence: true
    validates :zip_code, presence: true, numericality:{only_integer:true}
    validates :city, presence: true
end
