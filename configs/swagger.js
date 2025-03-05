import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "API Proyecto Bimestral",
            version:"1.0.0",
            description: "API web implementada en NodeJS, destinada a gestionar el registro de ventas, productos en línea y otras operaciones comerciales de una empresa",
            contact:{
                name: "Oliver Sales",
                email: "osales-2020584@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3002/apiWeb/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/category/*.js",
        "./src/product/*.js",
        "./src/user/*.js",
        "./src/auth/auth.routes.js",
        "./src/category/category.routes.js",
        "./src/product/product.routes.js",
        "./src/user/user.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi}