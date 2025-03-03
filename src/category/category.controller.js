import { error } from "console"
import Category from "./category.model.js"
import fs from "fs/promises"

//Agregar categoria
export const saveCategory  = async(req, res) => {
    try {
        const { name, description} = req.body;

        const newCategory = new Category({
            name,
            description
        })

        await newCategory.save();

        return res.status(201).json({
            succes: true,
            message: "Categoria creada exitosamente",
            Category: newCategory
        })

    } catch (err) {
        return res.status(500).json({
            succes: false,
            msg: "Error al crear la categoria ",
            err
        })
    }
}

//Listar categrias
export const getCategory = async(req,res) =>{
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = {};
        const [total, categorys] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            succes: true,
            total,
            categorys
        })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al obtener las categorias"
        })
    }
}

//Actualizar categoria

//Elliminar categroria