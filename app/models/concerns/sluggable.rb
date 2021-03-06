module Sluggable
  extend ActiveSupport::Concern

  included do
    acts_as_url :name,
      url_attribute: :slug,
      limit: 128

    validates :name,
      presence: true,
      length: { in: 4..128, allow_blank: true }

    alias_method :to_param, :slug
  end

  Stringex::ActsAsUrl::Adapter::Base.class_eval do
    def handle_duplicate_url!
      return unless url_taken?(base_url)

      n = nil
      loop do
        n = Kernel.rand(10_000..99_999)
        break unless url_taken?(duplicate_for_base_url(n))
      end

      write_url_attribute duplicate_for_base_url(n)
    end
  end
end
