module Admin
  module CustomerOrderHelper
    def link_to_download_note_in_pdf(customer_order)
      link_to admin_downloads_path(object: CustomerOrder, object_id: customer_order.id), method: :create do
        content_tag(:i, nil, class: "fas fa-file-export export-option-card fa-sm fa-fw text-gray-400 cursor-pointer", title: "Baixar nota em pdf")
      end
    end

    def display_status_customer_order(customer_order)
      set_params_status(customer_order)
      [content_tag(:i, nil, class: @class_list), content_tag(:span, @status_text, class: "ml-1", data: { path: @path })].join("").html_safe
    end

    def define_status_and_text_to_customer_order(status)
      class_list = "fas fa-circle text-"

      case status
      when "sent"
        class_list << "success"
        @status_text = :sent
      when "packing"
        class_list << "info"
        @status_text = :packing
      else
        class_list << "primary"
        @status_text = :waiting_for_shipment
      end

      [class_list, @status_text]
    end

    def display_dropdown_item_status_customer_order(customer_order)
      customer_order_statuses = CustomerOrder.statuses.keys - [customer_order.status]

      customer_order_statuses.map do |status|
        set_params_status(customer_order, status)
        params = { method: :patch, remote: true, data: { confirm: "Alterar status?" }, class: "dropdown-item" }

        link_to @path, params do
          [content_tag(:i, nil, class: @class_list), content_tag(:span, @status_text, class: "ml-1")].join("").html_safe
        end
      end.join("").html_safe
    end

    def set_params_status(customer_order, status = nil)
      customer_order_status = status || customer_order.status
      @class_list, status_text = define_status_and_text_to_customer_order(customer_order_status)
      @path = admin_customer_order_path(customer_order.id, customer_order: { status: status_text })
      @status_text = CustomerOrder.human_enum_name(:status, status_text)
    end
  end
end
