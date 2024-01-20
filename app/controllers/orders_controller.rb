class OrdersController < ApplicationController
    require 'securerandom'
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_order
    wrap_parameters format: []

    def create
        new_order = user.orders.create!(order_params)
        rand_id = SecureRandom.hex(10)
        unique_order_id = "#{rand_id}#{new_order.id}"
        new_order.update!(order_number: unique_order_id)

        products = user.order_products.select(&:in_cart)
        products.each {|item| 
            item.update!(order_id: new_order.id, in_cart: false)
        }

        render json: {order_products: user.order_products, new_order: new_order, products:user.products}, status: :created
    end

    def show 
        order = user.orders.find_by(order_number: params[:id])
        if order 
            render json: order
        else 
            render json: {errors:"Order does not exist."}, status: 404
        end
    end

    def destroy
        order = user.orders.find_by(id:params[:id])
        if order
            user.orders.destroy(params[:id])
            render json: user, status: :accepted
        else
            render json:{errors:"Order not found, can't cancel order."}, status: 404
        end
    end

    def update
        order = user.orders.find_by(id: params[:id])
        if order
            order.update!(order_params)
            render json: order, status: :accepted
        else
            render json: {errors:"Order not found, can't update."}, status: 404
        end
    end
    private

    def user
        user = User.find_by(id:session[:user_id])
        if user
            @user = user
        else
            render json: {errors:"User not found"}, status: 404
        end
    end

    def order_params
        params.permit(:id, :user_id, :first_name, :last_name, :card_number, :expiration, :cvv, :state, :city, :street_address, :apt_number, :zip_code, :holder_first_name, :holder_last_name)
    end

    def invalid_order invalid
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end


end
