class PostsController < ApplicationController
    before_action :find_post, only: [:show, :edit, :update, :destroy]

    def new
        @post = Post.new
    end

    def create
        # render json: params
        @post = Post.new(posts_params)

        if @post.save
            redirect_to post_path(@post.id)
        else
            render :new
        end
    end

    def show
        @comment = Comment.new
        @comments = @post.comments.order(created_at: :desc)
    end

    def edit
    end

    def update
        if @post.update(posts_params)
            redirect_to post_path(@post.id)
        else
            render :edit
        end
    end
 
    def destroy
        @post.destroy
        redirect_to posts_path
    end

    def index
        @posts = Post.all.order(created_at: :desc)
    end


    private
    def posts_params
        params.require(:post).permit(:title, :body)
    end

    def find_post
        @post = Post.find params[:id]
    end

end
