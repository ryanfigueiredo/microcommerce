Rails.application.routes.draw do
  root "home#index"

  namespace :admin do
    root "requests#index"
    resources :categories
    resources :products
    resources :delivery_charges
    resources :customer_orders, only: [:create]
  end
end
