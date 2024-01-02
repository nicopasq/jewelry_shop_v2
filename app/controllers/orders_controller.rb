class OrdersController < ApplicationController
require 'securerandom'
rescue_from ActiveRecord::RecordInvalid, with: :invalid_order
    def create
        user = User.find_by(id: session[:user_id])
        new_order = user.orders.create!(orderParams)
        rand_id = SecureRandom.hex(10)
        unique_order_id = rand_id+ new_order[:id].to_s
        products = user.order_products.filter{|item| item.in_cart == true}
        products.map{|item| 
        item[:order_id] = new_order[:id];
        item[:in_cart] = false
        }
        new_order.order_products = products
        new_order.update(order_number: unique_order_id)
        render json: {order_products: user.order_products, new_order: new_order}, status: :created
    end

    def show 
        user = User.find_by(id: session[:user_id])
        order = user.orders.find_by(order_number: params[:id])
        render json: order
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        user.orders.destroy(params[:id])
        head:no_content
        byebug
    end
    private

    def orderParams
        params.permit(:user_id, :first_name, :last_name, :card_number, :expiration, :cvv, :state, :city, :street_address, :apt_number, :zip_code, :order, :holder_first_name, :holder_last_name)
    end

    def invalid_order invalid
        render json: {errors: invalid.record.errors.full_messages}
    end


end
