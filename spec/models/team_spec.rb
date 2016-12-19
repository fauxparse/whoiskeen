require 'rails_helper'

RSpec.describe Team, type: :model do
  subject(:team) { create(:team) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_least(4) }
  it { is_expected.to validate_length_of(:name).is_at_most(128) }

  describe '#to_param' do
    subject(:param) { team.to_param }

    it 'reflects the team name' do
      expect(param).to eq team.name.to_url
    end

    context 'when the team name has special characters' do
      let(:team) { create(:team, name: 'Say 你好') }

      it 'romanises the name' do
        expect(param).to eq 'say-ni-hao'
      end
    end

    context 'when the team name is not unique' do
      before do
        create(:team, name: 'Boring')
      end
      let(:team) { create(:team, name: 'Boring') }

      it 'is still unique' do
        expect(param).to eq 'boring-1'
      end
    end
  end
end
