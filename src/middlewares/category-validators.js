import { body, param } from "express-validator";
import { categoryExists, categoryNameExists } from "../helpers/db-validators.js";
import { validarCampos} from "./validate-fields.js";
import { deleteFileOnError} from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js";

export const saveCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La description es requerido"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const getCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idCategory", "No es un ID válido").isMongoId(),
    param("idCategory").custom(categoryExists),
    param("name").optional().notEmpty().withMessage("El nombre no puede estar vacio"),
    body("description").optional().notEmpty().withMessage("La descripción no puede estar vacía"),
    validarCampos,
    handleErrors
];