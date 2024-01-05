class OrderProductsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_order_product
    before_action :authenticate_user
    wrap_parameters format: []

    def create
        if params[:ring]
            update_order_product_with_ring || create_new_order_product_with_ring
        else
            update_order_product || create_new_order_product
        end
    end

    def destroy
        current_user.order_products.destroy(params[:id])
        head:no_content
    end

    def update
        order_product = current_user.order_products.find_by(id: params[:id])
        order_product.update(order_id:params[:order_id], in_cart:false)
        render json: order_product
    end

    private

    def authenticate_user
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def current_user
        @current_user
    end

    def order_product_params
        params.permit(:product_id, :size, :quantity, :in_cart, :order_id)
    end

    def update_order_product_with_ring
        current_user.order_products.find_by(product_id:params[:product_id], size:params[:size], in_cart:true).try do |order_product|
            order_product.update(quantity:order_product[:quantity] + params[:quantity])
            render json: order_product, status: :accepted
        end
    end

    def create_new_order_product_with_ring
        current_user.order_products.create!(order_product_params)
        order_product = current_user.order_products.last
        render json: order_product, status: :created
    end

    def update_order_product
        current_user.order_products.find_by(product_id:params[:product_id], in_cart:true).try do |order_product|
            order_product.update(quantity:order_product[:quantity] + params[:quantity])
            render json: order_product, status: :accepted
        end
    end

    def create_new_order_product
        current_user.order_products.create!(order_product_params)
        order_product = current_user.order_products.last
        render json: order_product, status: :created
    end

    def invalid_order_product(exception)
        render json: { errors: exception.record.errors.full_message }, status: :unprocessable_entity
    end
end
