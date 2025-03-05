import User from "../user/user.model.js"
import Product from "../product/product.model.js"

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

export const productoExists = async (idProduct = "") => {
    const existe = await Product.findById(idProduct)
    if(!existe){
        throw new Error("No existe el producto con el ID proporcionado")
    }
}