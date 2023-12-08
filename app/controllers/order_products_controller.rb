class OrderProductsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_order_product
    wrap_parameters format: []


    def create
        user = User.find_by(id:params[:user_id])

        orderProduct = OrderProduct.create!(orderProductParams)
        render json: orderProduct, status: :created
    end

    def destroy
        user = User.find_by(id:params[:user_id])
        order = user.order_products.find_by(id:params[:id])
        OrderProduct.destroy(order[:id])
        render json: user
    end


    private

    def orderProductParams
        params.permit(:user_id, :product_id, :size, :quantity, :in_cart)
    end

    def invalid_order_product invalid
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end
end
