module Admin
  module ProductHelper
    def display_product_price(product)
      classes = "h7 mb-0 font-weight-bold text-gray-800"
      product_price = "R$ #{format_price(product.price)}"

      if product.promotional_price
        content_tag(:div, [content_tag(:del, product_price), " / R$ #{format_price(product.promotional_price)}"].join().html_safe, class: classes)
      else
        content_tag(:div, product_price, class: classes)
      end
    end
  end
end
