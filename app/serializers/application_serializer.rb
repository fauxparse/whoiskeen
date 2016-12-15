class ApplicationSerializer < ActiveModel::Serializer
  attribute :errors, if: :errors?

  def errors?
    object.respond_to? :errors
  end

  def errors
    object.errors.to_hash(true)
  end
end
