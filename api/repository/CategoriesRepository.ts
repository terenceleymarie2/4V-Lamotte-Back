import { sql } from "../repository/db";
import { CategoryModel } from "./models/CategoryModel";

class CategoriesRepository {

    public async getAllCategories(): Promise<CategoryModel[]> {
        return (await sql`SELECT * FROM categories ORDER BY competition ASC, category ASC`) as CategoryModel[];
    }
}

export default new CategoriesRepository();
