class UsersController < Clearance::UsersController
  def create
    @user = user_from_params

    if @user.save
      signup_succeeded
    else
      signup_failed
    end
  end

  private

  def signup_succeeded
    sign_in @user
    respond_to do |format|
      format.html { redirect_back_or url_after_create }
      format.json { render json: @user }
    end
  end

  def signup_failed
    respond_to do |format|
      format.html { render template: 'users/new' }
      format.json { render json: @user }
    end
  end
end
