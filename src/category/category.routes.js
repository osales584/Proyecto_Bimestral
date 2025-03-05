import { Router } from "express";
import { saveCategory, getCategory, updateCategory, deleteCategory} from "./category.controller.js";
import { saveCategoryValidator, getCategoryValidator, updateCategoryValidator, deleteCategoryValidator} from "../middlewares/category-validators.js";

const router = Router()

/**
 * @swagger
 * /saveCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 description: The description of the category
 *                 example: "Devices and gadgets"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Error creating category
 */
router.post("/saveCategory", saveCategoryValidator, saveCategory)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of categories
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 5
 *         description: The number of categories to return
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The number of categories to skip
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Error retrieving categories
 */
router.get("/", getCategoryValidator ,getCategory)

/**
 * @swagger
 * /updateCategory/{idCategory}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 description: The description of the category
 *                 example: "Devices and gadgets"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       500:
 *         description: Error updating category
 */
router.put("/updateCategory/:idCategory", updateCategoryValidator, updateCategory)

/**
 * @swagger
 * /deleteCategory/{idCategory}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting category
 */
router.delete("/deleteCategory/:idCategory", deleteCategoryValidator, deleteCategory)

export default router