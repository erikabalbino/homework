Rails.application.routes.draw do

  resource :session, only: [:new, :create, :destroy]

  resources :users, only: [:new, :create, :edit, :update]

  resources :posts do
    resources :comments, only: [:create, :destroy]

  end
  
end
