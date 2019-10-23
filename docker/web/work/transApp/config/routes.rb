Rails.application.routes.draw do
  get 'translation/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root :to => 'translation#index'

  get 'translation/index' => 'translation#index'
  get 'translation/show/:id' => 'translation#show'
  post 'translation/create' => 'translation#create'
  delete 'translation/delete' => 'translation#delete'
end
