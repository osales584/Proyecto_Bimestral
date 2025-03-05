import { hash } from "argon2";
import User from "../src/user/user.model.js";

export const createUserAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: "ADMIN_ROLE" });

        if (existingAdmin) {
            console.log("El usuario administrador ya existe.");
            return;
        }

        const hashedPassword = await hash("Password123*");
        const admin = new User({
            name: "Super",
            surname: "Admin",
            username: "superadmin",
            email: "superadmin@voicesocial.com",
            password: hashedPassword,
            phone: "12345678",
            role: "ADMIN_ROLE",
            status: true
        });

        await admin.save();

        console.log("Admin creado exitosamente.");
    } catch (err) {
        console.error("Error al crear admin:", err.message);
    }
};