import CategoriesService from "../../services/CategoriesService";

class CategoriesController {

    public async getCategories() {
        return await CategoriesService.getCategories();
    }

}

export default new CategoriesController();
