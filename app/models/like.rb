class Like < ApplicationRecord
    belongs_to :product
    belongs_to :user

    validates_uniqueness_of :user, :scope => [:product]
end
