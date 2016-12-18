class PasswordsController < Clearance::PasswordsController
  def create
    user = find_user_for_create
    if user
      user.forgot_password!
      deliver_email(user)
    end

    respond_to do |format|
      format.html { render template: 'passwords/create' }
      format.json { head :ok }
    end
  end
end
