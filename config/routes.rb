Rails.application.routes.draw do
  resources :passwords, controller: 'passwords', only: [:create, :new]
  resource :session, controller: 'sessions', only: [:show, :create]

  resources :users, controller: 'users', only: [:create] do
    resource :password, controller: 'passwords', only: [:create, :edit, :update]
  end

  delete '/sign_out' => 'sessions#destroy', as: 'sign_out'

  resources :teams

  constraints Clearance::Constraints::SignedIn.new do
    root to: 'teams#index'
  end

  constraints Clearance::Constraints::SignedOut.new do
    root to: 'public#index', as: :sign_in
  end
end
