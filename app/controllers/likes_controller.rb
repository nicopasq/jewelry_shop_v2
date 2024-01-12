class LikesController < ApplicationController
    wrap_parameters format: []

    def create
        Like.create!({user_id:session[:user_id], product_id: params[:productId]})
        like = Like.last
        render json: like
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        like = user.likes.find_by(id: params[:id])
        user.likes.destroy(like)
        head:no_content
    end
end
