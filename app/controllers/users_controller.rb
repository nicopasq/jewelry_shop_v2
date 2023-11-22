class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_signup
    wrap_parameters format: []

    def create 
        if params[:password] == params[:confirmation]
            new_user = User.create!(user_params)
            session[:user_id] = new_user.id
            render json: new_user, status: :created
        else
            render json: {errors: "Password and password confirmation must match."}, status: 422
        end
    end

    private
    def user_params
        params.permit(:username, :password)
    end

    def invalid_signup invalid
        render json: {errors: invalid.record.errors.full_messages}
    end
end
