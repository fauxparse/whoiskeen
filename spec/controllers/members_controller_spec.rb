require 'rails_helper'

RSpec.describe MembersController, type: :controller do
  let(:member) { create(:member, :real, team: team) }
  let(:team) { create(:team, name: 'Sulaco') }
  let(:user) { member.user }

  before do
    sign_in_as user
    request_json!
  end

  describe 'GET #index' do
    before do
      get :index, params: { team_id: team.to_param }
    end

    it 'renders successfully' do
      expect(response.content_type).to eq 'application/json'
      expect(response).to be_success
    end

    it 'is a list of members' do
      expect(json).to include a_hash_including(name: member.name)
    end
  end

  describe 'GET #show' do
    before do
      get :show, params: { team_id: team.to_param, id: member.to_param }
    end

    it 'renders successfully' do
      expect(response.content_type).to eq 'application/json'
      expect(response).to be_success
    end

    it 'is a JSON representation of a member' do
      expect(json[:name]).to eq member.name
    end
  end

  describe 'POST #create' do
    let(:member_attributes) do
      { name: 'Ripley' }
    end

    let(:post_request) do
      post :create, params: { team_id: team.to_param, member: member_attributes }
    end

    it 'creates a member' do
      expect { post_request }.to change(Member, :count).by 1
    end
  end
end
