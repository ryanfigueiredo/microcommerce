module Admin
  module CustomerOrderHelper
    def link_to_download_note_in_pdf(customer_order)
      link_to admin_downloads_path(object: CustomerOrder, object_id: customer_order.id), method: :create do
        content_tag(:i, nil, class: "fas fa-file-export export-option-card fa-sm fa-fw text-gray-400 cursor-pointer", title: "Baixar nota em pdf")
      end
    end
  end
end
