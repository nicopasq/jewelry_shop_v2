class ProductsController < ApplicationController

    def index
        products = Product.all
        if products
            render json: products
        else
            render json:{errors:"Please add products or run seed data."}, status: 404
        end
    end

    def show
        product = Product.find_by(id:params[:id])
        if product
            render json: product
        else
            render json:{errors:"Product not found"}, status: 404
        end
    end
end
