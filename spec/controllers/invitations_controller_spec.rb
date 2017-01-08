require 'rails_helper'

RSpec.describe InvitationsController, type: :controller do
  let(:admin) { create(:member, :admin, team: team) }
  let(:member) { create(:member, team: team) }
  let(:team) { create(:team) }
  let(:user) { create(:user) }
  let(:email) { user.email }
  let(:invitation) do
    create(:invitation, sender: admin, team: admin.team, email: email)
  end
  let(:logged_in_user) { admin.user }

  before do
    sign_in_as logged_in_user
    request_json!
  end

  describe 'POST #create' do
    before { post :create, params: invitation_params }

    let(:invitation_params) do
      {
        invitation: {
          member_id: member.id,
          sender_id: admin.id,
          team_id: team.id,
          email: email
        }
      }
    end

    it 'is successful' do
      expect(response).to be_success
    end

    it 'returns the invitation' do
      expect(json[:code]).to be_present
      expect(json[:status]).to eq 'pending'
      expect(json[:email]).to eq email
      expect(json[:senderId]).to eq admin.id
    end
  end

  describe 'POST #destroy' do
    before { invitation }

    it 'only cancels the invitation' do
      expect { post :destroy, params: { id: invitation.to_param } }
        .not_to change(Invitation, :count)
      expect(invitation.reload).to be_cancelled
    end
  end

  describe 'POST #accept' do
    let(:logged_in_user) { user }
    let(:member) { invitation.member }

    before { invitation }

    it 'accepts the invitation' do
      expect { post :accept, params: { id: invitation.to_param } }
        .not_to change(Invitation, :count)
      expect(invitation.reload).to be_accepted
    end

    it 'assigns the user to the member' do
      expect { post :accept, params: { id: invitation.to_param } }
        .to change { invitation.member.reload.user }
        .from(nil)
        .to(user)
    end
  end

  describe 'POST #decline' do
    let(:logged_in_user) { user }
    let(:member) { invitation.member }

    before { invitation }

    it 'declines the invitation' do
      expect { post :decline, params: { id: invitation.to_param } }
        .not_to change(Invitation, :count)
      expect(invitation.reload).to be_declined
    end

    it 'does not assign the user to the member' do
      expect { post :decline, params: { id: invitation.to_param } }
        .not_to change { invitation.member.reload.user }
    end
  end
end
