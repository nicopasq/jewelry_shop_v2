class OrderProduct < ApplicationRecord
    belongs_to :user
    belongs_to :product
    belongs_to :order

    validates :quantity, numericality: {only_integer: true, greater_than_or_equal_to: 1}
end
