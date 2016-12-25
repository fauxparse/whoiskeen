require 'rails_helper'

RSpec.describe Member, type: :model do
  subject(:member) { create(:member, team: team) }
  let(:team) { create(:team) }

  it { is_expected.to validate_presence_of(:name) }

  context 'with a user' do
    subject(:member) { build(:member, team: team, user: user) }
    let(:user) { create(:user) }

    context 'when the user is already on the team' do
      before { team.members.create!(user: user, name: 'Ripley') }

      it 'is invalid' do
        expect(member).not_to be_valid
        expect(member).to have_exactly(1).error_on(:user_id)
      end
    end
  end
end
