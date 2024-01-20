class OrderProductsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_order_product
    wrap_parameters format: []

    def create
        if params[:ring]
           update_order_product_ring || create_order_product
        else
            update_order_product || create_order_product
        end
    end

    def destroy
        order_product = user.order_products.find_by(id: params[:id])
        if order_product
            user.order_products.destroy(params[:id])
            head:no_content
        else
            render json: {errors:"Order product does not exist."}, status: 422
        end
    end

    def update
        order_product = user.order_products.find_by(id: params[:id])
        if order_product && params[:quantity] > 0
            order_product.update!(quantity: params[:quantity])
            render json: order_product, status: :accepted
        elsif params[:quantity].to_i == 0
            render json: {errors: "Can't increment quantity below 1. Please use 'remove all' insteaad.", id:order_product[:id]}, status: :unauthorized
        end
    end

    private

    def order_product_params
        params.permit(:product_id, :size, :quantity, :in_cart, :order_id, :ring)
    end

    def user 
        @user ||= User.find_by(id: session[:user_id])
    end

    def update_order_product_ring
        order_product = user.order_products.find_by(product_id:params[:product_id], size:params[:size], in_cart:true)
        if order_product && params[:quantity] > 0
            order_product.update!(quantity:order_product[:quantity] + params[:quantity])
            render json: order_product, status: :accepted
        end
    end

    def create_order_product
        user.order_products.create!(order_product_params)
        order_product = user.order_products.last
        render json: order_product, status: :created
    end

    def update_order_product
        order_product = user.order_products.find_by(product_id:params[:product_id], in_cart:true)
        if order_product && params[:quantity].to_i > 0
            order_product.update!(quantity:order_product[:quantity] + params[:quantity])
            render json: order_product, status: :accepted
        end
    end


    def invalid_order_product invalid
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end
end
