class OrderProductsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :user_unprocessable_entity
    wrap_parameters format: []


    def create
        user = User.find_by(id:params[:user_id])

        orderProduct = OrderProduct.create(orderProductParams)
        render json: orderProduct
    end

    private

    def orderProductParams
        params.permit(:user_id, :product_id, :size, :quantity, :in_cart)
    end

    def user_unprocessable_entity
        render json: {errors: "Please log in to continue."}, status: 422
    end
end
