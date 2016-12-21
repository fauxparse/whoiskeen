class ApplicationSerializer < ActiveModel::Serializer
  attribute :errors, if: :errors?

  def slug
    object.to_param
  end

  def errors?
    object.respond_to?(:errors) && object.errors.any?
  end

  def errors
    object.errors.to_hash(true)
  end
end
