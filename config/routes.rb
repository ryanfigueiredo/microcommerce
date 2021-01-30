Rails.application.routes.draw do
  root "home#index"

  namespace :admin do
    root "customer_orders#index"
    resources :categories
    resources :products
    resources :delivery_charges
    resources :customer_orders, only: [:create, :index, :update]
    resources :downloads, only: [:create]
    resources :reports, only: [:index]
  end
end
