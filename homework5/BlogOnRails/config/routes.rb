Rails.application.routes.draw do

  resource :session, only: [:new, :create, :destroy]

  # resources :users, only: [:new, :create, :edit, :update]

  resources :users, only: [:new, :create, :edit, :update] do
    collection do
      get 'edit_password'
      post 'update_password'
    end
  end

  resources :posts do
    resources :comments, only: [:create, :destroy]

  end

  get('/', {to: 'posts#index', as: 'home'})
  
end
