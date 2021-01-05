module Admin
  module ProductHelper
    def display_product_price(product)
      classes = "h6 mb-0 font-weight-bold text-gray-800"
      product_price = "R$ #{product.price}"

      if product.promotional_price
        content_tag(:div, [content_tag(:del, product_price), " / R$ #{product.promotional_price}"].join().html_safe, class: classes)
      else
        content_tag(:div, product_price, class: classes)
      end
    end
  end
end
