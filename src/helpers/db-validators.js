import User from "../user/user.model.js";
import Category from "../category/category.model.js";
import Product from "../product/product.model.js";

export const emailExists = async (email = "") => {
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`El email ${email} ya está registrado`);
    }
};

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({ username });
    if (existe) {
        throw new Error(`El username ${username} ya está registrado`);
    }
};

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid);
    if (!existe) {
        throw new Error("No existe el usuario con el ID proporcionado");
    }
};

export const categoryExists = async (idCategory = " ") => {
    const existe = await Category.findById(idCategory);
    if (!existe) {
        throw new Error("No existe la categoría con el ID proporcionado");
    }
};

export const categoryNameExists = async (name = "") => {
    const existe = await Category.findOne({ name });
    if (existe) {
        throw new Error(`La categoría '${name}' ya existe`);
    }
};

export const productoExists = async (idProduct = "") => {
    const existe = await Product.findById(idProduct);
    if (!existe) {
        throw new Error("No existe el producto con el ID proporcionado");
    }
};
