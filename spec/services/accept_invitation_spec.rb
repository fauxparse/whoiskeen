require 'rails_helper'

RSpec.describe AcceptInvitation do
  subject(:service) { AcceptInvitation.new(user, invitation) }
  let(:user) { create(:user) }
  let(:invitation) { create(:invitation) }

  it 'adds the user to the team' do
    expect { service.call }
      .to change { user.teams.count }
      .by 1
  end

  it 'marks the invitation as accepted' do
    expect { service.call }
      .to change { invitation.status }
      .from('pending')
      .to('accepted')
  end

  it 'assigns the user to the member' do
    expect { service.call }
      .to change { invitation.member.reload.user }
      .from(nil)
      .to(user)
  end
end
