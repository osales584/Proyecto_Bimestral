import { Router } from "express";
import { saveCategory, getCategory, updateCategory} from "./category.controller.js";
import { saveCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../middlewares/category-validators.js";

const router = Router()

router.post("/saveCategory", saveCategoryValidator, saveCategory)

router.get("/", getCategoryValidator ,getCategory)

router.put("/updateCategory/:idCategory", updateCategoryValidator, updateCategory)

export default router