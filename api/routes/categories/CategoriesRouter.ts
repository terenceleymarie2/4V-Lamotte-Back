import { Router } from "express";
import CategoriesController from "./CategoriesController";

class CategoriesRouter {
  
  public router: Router;
  
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.get("/categories", async (req, res) => {
        try {
            const result = await CategoriesController.getCategories();
            res.json(result);
        } catch (error) {
            res.status(500).json({ msg: "Erreur lors de la récupération des catégories", error });
        }
    });

  }

}

export default new CategoriesRouter();
