class LikesController < ApplicationController
    wrap_parameters format: []

    def create
        Like.create!({user_id:session[:user_id], product_id: params[:productId]})
        like = Like.last
        render json: like
    end
end
