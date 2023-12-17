class OrderProductsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_order_product
    wrap_parameters format: []

    def create
        user = User.find_by(id:params[:user_id])
        if params[:size] != ""
            product = user.order_products.find_by_product_id_and_size(params[:product_id], params[:size])
            if !product
                product = OrderProduct.create!(orderProductParams)
                render json: product, status: :created
            else 
                product.update(quantity: product[:quantity] + params[:quantity])
                render json: product, status: :accepted
            end
        elsif params[:size] == ""
            product = user.order_products.find_by(product_id: params[:product_id])
            if !product
                product = OrderProduct.create!(orderProductParams)
                render json: product, status: :created
            else 
                product.update(quantity: product[:quantity] + params[:quantity])
                render json: product, status: :accepted
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
        params.permit(:user_id, :product_id, :size, :quantity, :in_cart, :order_id)
    end

    def invalid_order_product invalid
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end
end
