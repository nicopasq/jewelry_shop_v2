class OrdersController < ApplicationController
require 'securerandom'
rescue_from ActiveRecord::RecordInvalid, with: :invalid_order


    def create
        new_order = user.orders.create!(order_params)
        rand_id = SecureRandom.hex(10)
        unique_order_id = "#{rand_id}#{new_order.id}"
        new_order.update(order_number: unique_order_id)

        products = user.order_products.select(&:in_cart)
        products.each {|item| 
            item.update(order_id: new_order.id, in_cart: false)
        }

        render json: {order_products: user.order_products, new_order: new_order}, status: :created
    end

    def show 
        order = user.orders.find_by(order_number: params[:id])
        render json: order
    end

    def destroy
        user.orders.destroy(params[:id])
        head:no_content
    end

    def update
        order = user.orders.find_by(id: params[:id])
        order.update(order_params)
        render json: order
    end
    private

    def user
        @user = User.find_by(id:session[:user_id])
    end
    def order_params
        params.permit(:id, :user_id, :first_name, :last_name, :card_number, :expiration, :cvv, :state, :city, :street_address, :apt_number, :zip_code, :holder_first_name, :holder_last_name)
    end

    def invalid_order invalid
        render json: {errors: invalid.record.errors.full_messages}
    end


end
