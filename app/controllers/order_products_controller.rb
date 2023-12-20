class OrderProductsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_order_product
    wrap_parameters format: []

    def create
        user = User.find_by(id:params[:user_id])
        # byebug

        if params[:ring]
            order_product = user.order_products.find_by(product_id:params[:product_id], size:params[:size], in_cart:true)
            if order_product && params[:quantity] > 0
                order_product.update(quantity:order_product[:quantity] + params[:quantity])
                render json: order_product, status: :accepted
            elsif !order_product 
                order_product = OrderProduct.create!(orderProductParams)
                render json: order_product, status: :created
            end
        else
            order_product = user.order_products.find_by(product_id:params[:product_id], in_cart:true)
            if order_product 
                order_product.update(quantity:order_product[:quantity] + params[:quantity])
                render json: order_product, status: :accepted
            elsif !order_product 
                order_product = OrderProduct.create!(orderProductParams)
                render json: order_product, status: :created
            end
        end

    end

    def destroy
        user = User.find_by(id:params[:user_id])
        order = user.order_products.find_by(id:params[:id])
        OrderProduct.destroy(order[:id])
        render json: user
    end

    def update
        user = User.find_by(id: params[:user_id])
        order_product = user.order_products.find_by(id: params[:id])
        order_product.update(order_id:params[:order_id], in_cart:false)
        # byebug
        render json: order_product
    end

    private

    def orderProductParams
        params.permit(:user_id, :product_id, :size, :quantity, :in_cart, :order_id, :ring)
    end

    def invalid_order_product invalid
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end
end
