class CreateMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :members do |t|
      t.belongs_to :team, required: true, foreign_key: { on_delete: :cascade }
      t.belongs_to :user, required: false, foreign_key: { on_delete: :nullify }
      t.string :name, required: true, limit: 128
      t.string :slug, required: true, limit: 128
      t.timestamps

      t.index [:team_id, :user_id]
      t.index [:team_id, :slug], unique: true
    end
  end
end
