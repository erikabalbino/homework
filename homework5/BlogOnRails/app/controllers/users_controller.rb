class UsersController < ApplicationController

    def new 
        @user = User.new
    end

    def create
        # render json: params
        @user = User.new user_params

        if @user.save
            session[:user_id] = @user.id
            redirect_to posts_path
        else
            render :new
        end
    end

    def edit
        @user = User.find params[:id]
    end

    def update
        # render json: params

        if current_user.update_attributes(params.require(:user).permit(:first_name, :email))
            redirect_to posts_path
        else
            render :edit
        end
        
    end
    
    private
    def user_params 
        params.require(:user).permit(
            :first_name, :last_name, :email, :password, :password_confirmation
        )
    end
    
end
