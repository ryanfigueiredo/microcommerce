Rails.application.routes.draw do
  root "home#index"

  namespace :admin do
    resources :categories
  end
end
