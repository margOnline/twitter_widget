Rails.application.routes.draw do
  root to: "home#index"

  get '/twitter_timeline', to: 'twitter_timeline#show'
end
