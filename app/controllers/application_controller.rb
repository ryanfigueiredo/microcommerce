class ApplicationController < ActionController::Base
  helper_method :current_setting

  def format_price(price)
    format("%.2f", price) if price.present?
  end

  def current_setting
    Setting.first
  end
end
