module Requests
  module JsonHelpers
    def json
      case data = JSON.parse(response.body)
      when Array then data.map { |item| HashWithIndifferentAccess.new(item) }
      when Hash then HashWithIndifferentAccess.new(data)
      else data
      end
    end

    def request_json!
      request.accept = 'application/json'
    end
  end
end
