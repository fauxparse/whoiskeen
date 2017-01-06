require 'rails_helper'

RSpec.describe Invitation, type: :model do
  subject(:invitation) { build(:invitation, sender: sender, member: member) }
  let(:team) { create(:team) }
  let(:sender) { create(:member, :admin, team: team) }
  let(:member) { create(:member, team: team) }

  it { is_expected.to be_valid }

  it { is_expected.to validate_presence_of(:sender) }
  it { is_expected.to validate_presence_of(:member) }

  context 'when the sender is not an admin' do
    let(:sender) { create(:member, team: team) }

    it 'is invalid' do
      expect(invitation).not_to be_valid
      expect(invitation).to have_exactly(1).error_on(:sender_id)
    end
  end

  context 'when the sender is on a different team' do
    let(:sender) { create(:member, :admin) }

    it 'is invalid' do
      expect(invitation).not_to be_valid
      expect(invitation).to have_exactly(1).error_on(:sender_id)
    end
  end

  context 'when the member is already registered' do
    let(:member) { create(:member, :real, team: team) }

    it 'is invalid' do
      expect(invitation).not_to be_valid
      expect(invitation).to have_exactly(1).error_on(:member_id)
    end
  end

  context 'when the email is not unique' do
    before { create(:invitation, team: team, email: invitation.email) }

    it 'is invalid' do
      expect(invitation).not_to be_valid
      expect(invitation).to have_exactly(1).error_on(:email)
    end
  end

  context 'when a cancelled invitation exists with the same email' do
    before do
      create(:invitation, team: team, email: invitation.email).cancelled!
    end

    it 'is valid' do
      expect(invitation).to be_valid
    end
  end
end
