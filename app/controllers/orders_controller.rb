class OrdersController < ApplicationController

    def create
        user = User.find_by(id: params[:user_id])
        new_order = user.orders.create!(orderParams)
        products = user.order_products.filter{|item| item.in_cart == true}
        products.map{|item| 
            item[:order_id] = new_order[:id];
            item[:in_cart] = false
        }
        new_order.order_products = products
        render json: new_order
    end

    private

    def orderParams
        params.permit(:user_id, :first_name, :last_name, :card_number, :expiration, :cvv, :state, :city, :street_address, :apt_number, :zip_code)
    end
end
