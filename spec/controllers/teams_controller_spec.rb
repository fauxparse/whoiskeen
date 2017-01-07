require 'rails_helper'

RSpec.describe TeamsController, type: :controller do
  let(:member) { create(:member, :real, team: team) }
  let(:team) { create(:team, name: 'Sulaco') }
  let(:user) { member.user }

  before do
    sign_in_as user
    request_json!
  end

  describe 'GET #index' do
    let(:teams) { json.map { |m| m[:team] } }

    before do
      create(:team, name: 'Nostromo')
      get :index
    end

    it 'renders successfully' do
      expect(response.content_type).to eq 'application/json'
      expect(response).to be_success
    end

    it 'is a list of memberships' do
      expect(json).to include a_hash_including(name: member.name)
    end

    it 'only includes teams I have access to' do
      expect(teams).to include a_hash_including(name: 'Sulaco')
      expect(teams).not_to include a_hash_including(name: 'Nostromo')
    end
  end

  describe 'GET #show' do
    before do
      get :show, params: { id: team.to_param }
    end

    it 'renders successfully' do
      expect(response.content_type).to eq 'application/json'
      expect(response).to be_success
    end

    it 'has a list of members' do
      expect(json[:members])
        .to include a_hash_including(id: member.id)
    end
  end

  describe 'POST #create' do
    let(:post_request) do
      post :create,
        params: { team: { name: 'Nostromo', display_name: 'Ripley' } }
    end

    it 'creates a team' do
      expect { post_request }.to change(Team, :count).by 1
    end

    it 'creates a member' do
      expect { post_request }.to change(Member, :count).by 1
      expect(Member.where(name: 'Ripley')).to exist
    end
  end
end
