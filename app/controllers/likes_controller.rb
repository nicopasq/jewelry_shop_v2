class LikesController < ApplicationController
    wrap_parameters format: []

    def create
        like = Like.new({user_id:session[:user_id], product_id: params[:productId]})
        if like.save
            render json: like, status: :accepted
        else
            invalidLike
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        like = user.likes.find_by(id: params[:id])
        if like 
            user.likes.destroy(like)
            head:no_content
        else
            invalidLike
        end
    end

    private

    def invalidLike
        render json: {error:"Can't perform action"}, status: 422
    end
end
