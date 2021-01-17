module ErrorsHelper
  def display_field_error_message(object, object_attribute)
    content_tag(:div, object.errors.full_messages_for(object_attribute).first, class: "invalid-feedback")
  end

  def bootstrap_class_for_flash(flash_type)
    case flash_type
    when "notice"
      "success"
    when "alert"
      "danger"
    else
      "info"
    end
  end
end
