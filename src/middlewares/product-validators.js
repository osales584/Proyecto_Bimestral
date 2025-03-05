import { body, param} from "express-validator";
import { validarCampos} from "./validate-fields.js";
import { productoExists } from "../helpers/db-validators.js";
import { deleteFileOnError} from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js";

export const saveProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La description es requerido"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const listProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
]

export const updateProductStockValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idProduct").isMongoId().withMessage("El ID del producto no es válido"),
    param("idProduct").custom(productoExists),
    body("stock").isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a 0"),
    validarCampos,
    handleErrors
];

export const getProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idProduct").isMongoId().withMessage("El ID del producto no es válido"),
    param("idProduct").custom(productoExists),
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idProduct").isMongoId().withMessage("El ID del producto no es válido"),
    param("idProduct").custom(productoExists), // Asegura que el producto existe antes de eliminarlo
    handleErrors
];

export const  manageInventoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
]

export const exploreProductsValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE")
]