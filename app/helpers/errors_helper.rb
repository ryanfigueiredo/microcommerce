module ErrorsHelper
  def display_field_error_message(object)
    object.errors.details.keys.map do |attribute|
      content_tag(:div, object.errors.full_messages_for(attribute).first, class: "invalid-feedback")
    end.join.html_safe
  end
end
