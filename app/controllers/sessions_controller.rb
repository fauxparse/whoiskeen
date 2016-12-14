class SessionsController < Clearance::SessionsController
  def show
    render json: current_user || User.new
  end

  def create
    @user = authenticate(params)

    sign_in(@user) do |status|
      respond_to do |format|
        if status.success?
          format.html { redirect_back_or url_after_create }
          format.json { render json: @user }
        else
          format.html do
            flash.now.notice = status.failure_message
            render template: "sessions/new", status: :unauthorized
          end
          format.json { render json: @user }
        end
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
end
