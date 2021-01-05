module Admin
  class DeliveryChargesController < ApplicationController
    before_action :set_delivery_charge, only: [:update, :destroy, :edit]

    def index
      @delivery_charges = DeliveryCharge.order(:county)
    end

    def new
      @delivery_charge = DeliveryCharge.new
    end

    def edit; end

    def create
      @delivery_charge = DeliveryCharge.new(delivery_charge_params)

      respond_to do |format|
        if @delivery_charge.save
          format.html { redirect_to admin_delivery_charges_path, notice: 'Taxa de entrega criada com sucesso.' }
        else
          format.html { render :new }
        end
      end
    end

    def update
      respond_to do |format|
        if @delivery_charge.update(delivery_charge_params)
          format.html { redirect_to admin_delivery_charges_path, notice: 'Taxa de entrega atualizada com sucesso.' }
        else
          format.html { render :edit }
        end
      end
    end

    def destroy
      @delivery_charge.destroy
      respond_to do |format|
        format.html { redirect_to admin_delivery_charges_path, notice: 'Taxa de entrega removida com sucesso.' }
        format.json { head :no_content }
      end
    end

    private

    def delivery_charge_params
      params.require(:delivery_charge).permit(:county, :price)
    end

    def set_delivery_charge
      @delivery_charge = DeliveryCharge.find(params[:id])
    end
  end
end
