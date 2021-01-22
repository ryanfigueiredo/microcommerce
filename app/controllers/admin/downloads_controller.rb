module Admin
  class DownloadsController < ApplicationController
    before_action :set_object, only: [:create]

    def create

      binding.pry

    end

    private

    def set_object
      @object = params[:object].singularize.classify.constantize.find(params[:object_id])
    end
  end
end
