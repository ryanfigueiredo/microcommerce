class HomeController < ApplicationController
  before_action :set_dependencies, only: [:index]

  layout 'public'

  def index; end

  private

  def set_dependencies
    @categories = Category.order(:name)
  end
end
