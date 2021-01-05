Rails.application.routes.draw do
  root "home#index"

  namespace :admin do
    root "requests#index"
    resources :categories
    resources :products
  end
end
