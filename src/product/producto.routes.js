import { Router } from "express";
import { saveProduct, listProducts, updateProductStock, getProducts, updateProduct, deleteProduct, manageInventory, exploreProducts } from "./product.controller.js";
import { saveProductValidator, listProductsValidator, updateProductStockValidator, getProductsValidator, updateProductValidator, deleteProductValidator, manageInventoryValidator, exploreProductsValidator} from "../middlewares/product-validators.js";

const router = Router();

/**
 * @swagger
 * /saveProduct:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       500:
 *         description: Error al crear el producto
 */
router.post("/saveProduct", saveProductValidator, saveProduct);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *       500:
 *         description: Error al obtener los productos
 */
router.get("/", listProductsValidator, listProducts);

/**
 * @swagger
 * /updateStock/{idProduct}:
 *   patch:
 *     summary: Actualizar el stock de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stock de producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al actualizar el stock del producto
 */
router.patch("/updateStock/:idProduct", updateProductStockValidator, updateProductStock);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Filtrar productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Paginación
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Tipo de filtro (out-of-stock, top-selling)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del producto
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Categoría del producto
 *     responses:
 *       200:
 *         description: Lista de productos filtrados
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al obtener los productos
 */
router.get("/products", getProductsValidator, getProducts);

/**
 * @swagger
 * /updateProduct/{idProduct}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al actualizar el producto
 */
router.put("/updateProduct/:idProduct", updateProductValidator, updateProduct);

/**
 * @swagger
 * /deleteProduct/{idProduct}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al eliminar el producto
 */
router.delete("/deleteProduct/:idProduct", deleteProductValidator, deleteProduct);

/**
 * @swagger
 * /manageInventory:
 *   get:
 *     summary: Gestionar inventario
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Acción a realizar (sale, restock, low-stock)
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Paginación
 *       - in: query
 *         name: idProduct
 *         schema:
 *           type: string
 *         description: ID del producto
 *       - in: query
 *         name: quantity
 *         schema:
 *           type: integer
 *         description: Cantidad de producto
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del producto
 *     responses:
 *       200:
 *         description: Inventario gestionado exitosamente
 *       400:
 *         description: Acción no válida
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al gestionar el inventario
 */
router.get("/manageInventory", manageInventoryValidator, manageInventory);

/**
 * @swagger
 * /explore:
 *   get:
 *     summary: Explorar productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Paginación
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del producto
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Categoría del producto
 *     responses:
 *       200:
 *         description: Exploración de productos
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al explorar los productos
 */
router.get("/explore", exploreProductsValidator, exploreProducts);

export default router;