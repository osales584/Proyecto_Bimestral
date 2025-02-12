import { Router } from "express";
import { saveCategory, getCategory } from "./category.controller.js";
import { saveCategoryValidator } from "../middlewares/category-validators.js";

const router = Router()

router.post("/saveCategory", saveCategoryValidator, saveCategory)

router.get("/", getCategory)

export default router