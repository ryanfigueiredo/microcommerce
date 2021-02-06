module Admin
  class SettingsController < ApplicationController
    before_action :set_setting, only: [:edit, :update]

    def edit; end

    def update
      respond_to do |format|
        if @setting.update(setting_params)
          format.html { redirect_to admin_customer_orders_path, notice: 'Configurações atualizadas com sucesso.' }
        else
          format.html { render :edit }
        end
      end
    end

    private

    def set_setting
      @setting = Setting.find(params[:id])
    end

    def setting_params
      params.require(:setting).permit(:commerce_name,
        :header_color, :footer_color, :sidebar_color,
        :text_sidebar, :short_text_sidebar, :text_footer,
        :display_general_search, :logo
      )
    end
  end
end
