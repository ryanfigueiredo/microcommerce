module Admin
  class ProductsController < ApplicationController
    before_action :set_product, only: [:update, :show, :destroy, :edit]

    def index
      @products = Product.order(:name)
    end

    def show; end

    def new
      @product = Product.new
      @categories = Category.order(:name)
    end

    def edit
      @categories = Category.order(:name)
    end

    def create
      @product = Product.new(product_params)

      respond_to do |format|
        if @product.save
          format.html { redirect_to admin_products_path, notice: 'Produto criado com sucesso.' }
        else
          format.html { render :new }
        end
      end
    end

    def update
      respond_to do |format|
        if @product.update(product_params)
          format.html { redirect_to admin_products_path, notice: 'Produto atualizado com sucesso.' }
        else
          format.html { render :edit }
        end
      end
    end

    def destroy
      @product.destroy
      respond_to do |format|
        format.html { redirect_to admin_products_path, notice: 'Produto removido com sucesso.' }
        format.json { head :no_content }
      end
    end

    private

    def product_params
      params.require(:product).permit(:name, :description, :price, :promotional_price, :category_id, :picture)
    end

    def set_product
      @product = Product.find(params[:id])
    end
  end
end
