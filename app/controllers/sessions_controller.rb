class SessionsController < Clearance::SessionsController
  skip_before_action :require_login, except: [:destroy]

  def show
    render json: current_user || User.new
  end

  def create
    @user = authenticate(params)

    sign_in(@user) do |status|
      if status.success?
        login_succeeded
      else
        login_failed(status.failure_message)
      end
    end
  end

  def destroy
    sign_out

    respond_to do |format|
      format.json { render json: User.new }
      format.html { redirect_to sign_in_path }
    end
  end

  private

  def user_with_failure_message(failure_message)
    User.new(email: params[:session][:email]).tap do |user|
      user.errors.add(:base, failure_message)
    end
  end

  def login_succeeded
    respond_to do |format|
      format.json { render json: @user }
    end
  end

  def login_failed(failure_message)
    respond_to do |format|
      format.json { render json: user_with_failure_message(failure_message) }
    end
  end
end
