Rails.application.routes.draw do
  resources :likes
  resources :order_products, only:[:create, :destroy, :update]
  resources :orders
  resources :users, only:[:create]
  resources :products, only:[:show, :index]

  delete '/orders', to:'orders#destroy'
  post '/login', to:'sessions#create'
  get '/auth', to:'sessions#show'
  delete '/logout', to:'sessions#destroy'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
