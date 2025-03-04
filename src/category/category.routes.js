import { Router } from "express";
import { saveCategory, getCategory, updateCategory, deleteCategory} from "./category.controller.js";
import { saveCategoryValidator, getCategoryValidator, updateCategoryValidator, deleteCategoryValidator} from "../middlewares/category-validators.js";

const router = Router()

router.post("/saveCategory", saveCategoryValidator, saveCategory)

router.get("/", getCategoryValidator ,getCategory)

router.put("/updateCategory/:idCategory", updateCategoryValidator, updateCategory)

router.delete("/deleteCategory/:idCategory", deleteCategoryValidator, deleteCategory)

export default router