"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import { createUserAdmin } from "./admin.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import productRoutes from "../src/product/producto.routes.js"
import categoryRoutes from "../src/category/category.routes.js"


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) => {
    app.use("/apiWeb/v1/auth", authRoutes)
    app.use("/apiWeb/v1/user", userRoutes)
    app.use("/apiWeb/v1/category", categoryRoutes)
    app.use("/apiWeb/v1/product", productRoutes)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        createUserAdmin()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}