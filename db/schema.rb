# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170104210852) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "invitations", force: :cascade do |t|
    t.bigint "member_id"
    t.bigint "sender_id"
    t.string "email", limit: 128
    t.string "code", limit: 64
    t.string "status", limit: 16, default: "pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_invitations_on_code", using: :btree
    t.index ["member_id"], name: "index_invitations_on_member_id", using: :btree
    t.index ["sender_id"], name: "index_invitations_on_sender_id", using: :btree
  end

  create_table "members", force: :cascade do |t|
    t.bigint "team_id"
    t.bigint "user_id"
    t.string "name", limit: 128
    t.string "slug", limit: 128
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.index ["team_id", "slug"], name: "index_members_on_team_id_and_slug", unique: true, using: :btree
    t.index ["team_id", "user_id"], name: "index_members_on_team_id_and_user_id", using: :btree
    t.index ["team_id"], name: "index_members_on_team_id", using: :btree
    t.index ["user_id"], name: "index_members_on_user_id", using: :btree
  end

  create_table "teams", force: :cascade do |t|
    t.string "name", limit: 128
    t.string "slug", limit: 128
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_teams_on_slug", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.string "encrypted_password", limit: 128, null: false
    t.string "confirmation_token", limit: 128
    t.string "remember_token", limit: 128, null: false
    t.index ["email"], name: "index_users_on_email", using: :btree
    t.index ["remember_token"], name: "index_users_on_remember_token", using: :btree
  end

  add_foreign_key "invitations", "members", column: "sender_id", on_delete: :cascade
  add_foreign_key "invitations", "members", on_delete: :cascade
  add_foreign_key "members", "teams", on_delete: :cascade
  add_foreign_key "members", "users", on_delete: :nullify
end
