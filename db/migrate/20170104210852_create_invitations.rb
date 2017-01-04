class CreateInvitations < ActiveRecord::Migration[5.1]
  def change
    create_table :invitations do |t|
      t.belongs_to :member, index: true, foreign_key: { on_delete: :cascade }
      t.belongs_to :sender,
        foreign_key: { on_delete: :cascade, to_table: :members }
      t.string :email, limit: 128, required: true
      t.string :code, limit: 64, required: true, index: true
      t.string :status, limit: 16, required: true, default: 'pending'
      t.timestamps
    end
  end
end
