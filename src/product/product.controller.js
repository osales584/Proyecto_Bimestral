import Product from "./product.model.js";
import Category from "../category/category.model.js"

//Crear producto
export const saveProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Producto creado exitosamente",
            product: newProduct
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al crear el producto",
            err
        });
    }
};

//Listar producto
export const listProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category", "name");

        return res.status(200).json({
            success: true,
            products
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al obtener los productos",
            err
        });
    }
};

//Actualizar stock de un producto
export const updateProductStock = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const { stock } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(idProduct, { stock }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                msg: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock de producto actualizado exitosamente",
            product: updatedProduct
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar el stock del producto",
            err
        });
    }
};

//Filtrar productos
export const getProducts = async (req, res) => {
    try {
        const { desde = 0, type, name, category } = req.query; 
        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' }; 
        }
        if (category) {
            const categoryData = await Category.findOne({ name: { $regex: category, $options: 'i' } });
            if (categoryData) {
                query.category = categoryData._id; 
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Categoría no encontrada"
                });
            }
        }

        let sortOptions = {};
        switch (type) {
            case 'out-of-stock':

                query.stock = { $lte: 0 };
                break;
            case 'top-selling':
                sortOptions = { salesCount: -1 };
                break;
            default:
                sortOptions = {};
        }

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .sort(sortOptions) 
                .skip(Number(desde)) 
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
};

//Actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const  data  = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(idProduct, data, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                msg: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Producto actualizado exitosamente",
            product: updatedProduct
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar el producto",
            err
        });
    }
};

//Eliminar producto
export const deleteProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;

        const product = await Product.findByIdAndDelete(idProduct);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Producto eliminado exitosamente",
            product 
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        });
    }
};

//Invetario
export const manageInventory = async (req, res) => {
    try {
        const { action, desde = 0, idProduct, quantity, name } = req.query; 
        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        let sortOptions = {};
        
        switch (action) {
            case 'sale':
                // Realizar una venta
                const productSale = await Product.findById(idProduct);

                if (!productSale) {
                    return res.status(404).json({
                        success: false,
                        message: "Producto no encontrado"
                    });
                }

                if (productSale.stock < quantity) {  
                    return res.status(400).json({
                        success: false,
                        message: "No hay suficiente inventario para completar la venta"
                    });
                }

                productSale.stock -= quantity;  
                productSale.salesCount += quantity;
                await productSale.save();

                return res.status(200).json({
                    success: true,
                    message: "Venta procesada exitosamente",
                    product: productSale
                });

            case 'restock':
                // Reabastecer inventario
                const productRestock = await Product.findById(idProduct);

                if (!productRestock) {
                    return res.status(404).json({
                        success: false,
                        message: "Producto no encontrado"
                    });
                }

                productRestock.stock += quantity; 
                await productRestock.save();

                return res.status(200).json({
                    success: true,
                    message: "Inventario actualizado exitosamente",
                    product: productRestock
                });

            case 'low-stock':
                // Productos con bajo inventario (menos de 10 unidades)
                query.stock = { $lt: 10 };  
                break;

            default:
                return res.status(400).json({
                    success: false,
                    message: "Acción no válida"
                });
        }

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .sort(sortOptions) 
                .skip(Number(desde))  
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al gestionar el inventario",
            error: err.message
        });
    }
};

//Explorar productos
export const exploreProducts = async (req, res) => {
    try {
        const { desde = 0, name, category } = req.query;
        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        if (category) {
            const categoryData = await Category.findOne({ name: { $regex: category, $options: 'i' } });
            if (categoryData) {
                query.category = categoryData._id;
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Categoría no encontrada"
                });
            }
        }

        const categories = await Category.find({}, "name");

        const bestSellers = await Product.find().sort({ salesCount: -1 }).limit(10);

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query).skip(Number(desde))
        ]);

        return res.status(200).json({
            success: true,
            message: "Exploración de productos",
            categories,
            bestSellers,
            total,
            products
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al explorar los productos",
            error: err.message
        });
    }
};
