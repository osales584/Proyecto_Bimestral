import User from "../user/user.model.js"
import Category from "../category/category.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya esta registrado`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El username ${username} ya esta registrado`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const categoryExists = async (idCategory = " ") => {
    const existe = await Category.findById(idCategory)
    if (!existe) {
        throw new Error("No existe la categoria con el ID proporcionado");
    }
};

export const categoryNameExists = async (name = "") => {
    const existe = await Category.findOne({ name });
    if (existe) {
        throw new Error(`La categoría '${name}' ya existe`);
    }
};