import CategoriesRepository from "../repository/CategoriesRepository";
import { CategoryResponse } from "../routes/categories/models/CategoriesResponse";

class CategoriesService {

    public async getCategories(): Promise<CategoryResponse[]> {
        return await CategoriesRepository.getAllCategories();
    }

}

export default new CategoriesService();
