import { Router } from "express";
import { saveProduct, listProducts, updateProductStock, getProducts, updateProduct, deleteProduct, manageInventory, exploreProducts } from "./product.controller.js";
import { saveProductValidator, listProductsValidator, updateProductStockValidator, getProductsValidator, updateProductValidator, deleteProductValidator, manageInventoryValidator, exploreProductsValidator} from "../middlewares/product-validators.js";

const router = Router()

router.post("/saveProduct", saveProductValidator, saveProduct)

router.get("/", listProductsValidator, listProducts)

router.patch("/updateStock/:idProduct", updateProductStockValidator, updateProductStock)

router.get("/products", getProductsValidator, getProducts)

router.put("/updateProduct/:idProduct", updateProductValidator, updateProduct)

router.delete("/deleteProduct/:idProduct", deleteProductValidator, deleteProduct)

router.get("/manageInventory", manageInventoryValidator, manageInventory)

router.get("/explore", exploreProductsValidator, exploreProducts)

export default router