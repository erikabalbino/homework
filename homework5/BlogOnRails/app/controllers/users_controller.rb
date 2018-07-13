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

        # if current_user.update_attributes(params.require(:user).permit(:first_name, :email))
        if current_user.update(user_params)
            redirect_to posts_path
        else
            render :edit
        end
        
    end

    def edit_password
        if user_signed_in?
            @user = current_user
        else
            flash[:danger] = "Access Denied!"
            redirect_to posts_path
        end
    end


    def update_password

        if current_user.authenticate(user_params[:password])
            if user_params[:password] == user_params[:new_password]
                flash.now[:alert] = "🔥 Current password equal new password ! 🔥";
                @user = current_user;
                render :edit_password
            else
                if user_params[:new_password] === user_params[:password_confirmation] 
                # if current_user.update(password: user_params[:new_password], password_confirmation: user_params[:password_confirmation])
                    current_user.password = user_params[:new_password]
                    current_user.password_confirmation = user_params[:password_confirmation]
                    current_user.save
                        flash[:success] = " 👏 Successfully changed password ! 👏";
                        redirect_to posts_path
                else
                    flash.now[:alert] = "🔥 Wrong password confirmation ! 🔥";
                    @user = current_user;
                    render :edit_password
                end
            end
        else
            flash.now[:alert] = " 🔥 Wrong Current password ! 🔥";
            @user = current_user;
            render :edit_password
        end

    end
    
    private
    def user_params 
        params.require(:user).permit(
            :first_name, :last_name, :email, :password, :new_password, :password_confirmation
        )
    end
    
end
