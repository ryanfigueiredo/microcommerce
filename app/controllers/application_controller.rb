class ApplicationController < ActionController::Base
  before_action :set_setting

  def format_price(price)
    format("%.2f", price) if price.present?
  end

  def set_setting
    @setting = Setting.first
  end
end
