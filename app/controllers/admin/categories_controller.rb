module Admin
  class CategoriesController < ApplicationController
    before_action :set_category, only: [:update, :show, :destroy, :edit]

    def index
      @categories = Category.order(:name)
    end

    def show; end

    def new
      @category = Category.new
    end

    def edit; end

    def create
      @category = Category.new(category_params)

      respond_to do |format|
        if @category.save
          format.html { redirect_to admin_categories_path, notice: 'Categoria criada com sucesso.' }
        else
          format.html { render :new }
        end
      end
    end

    def update
      respond_to do |format|
        if @category.update(category_params)
          format.html { redirect_to admin_categories_path, notice: 'Categoria atualizada com sucesso.' }
        else
          format.html { render :edit }
        end
      end
    end

    def destroy
      @category.destroy
      respond_to do |format|
        format.html { redirect_to admin_categories_path, notice: 'Categoria removida com sucesso.' }
        format.json { head :no_content }
      end
    end

    private

    def category_params
      params.require(:category).permit(:name)
    end

    def set_category
      @category = Category.find(params[:id])
    end
  end
end
