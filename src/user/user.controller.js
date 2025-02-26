import { hash } from "argon2";
import User from "./user.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

//Buscar usuario por uid
export const getUserById = async (req, res) => {
    try{
        const { uid } = req.params;
        const user = await User.findById(uid)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

//Listar usuarios
export const getUsers = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

//Eliminar usuario
export const deleteUser = async (req, res) => {
    try{
        const { uid } = req
        
        const user = await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

//Actualizar rol de usuario
export const updateUserRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const {role} = req.body;

        const user = await User.findById(uid);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (req.usuario.role === 'ADMIN_ROLE') {
            const userToUpdate = await User.findById(uid);

            if (userToUpdate.role === 'ADMIN_ROLE') {
                return res.status(403).json({
                    success: false,
                    msg: 'No puedes modificar el rol de otro administrador.'
                });
            }
        }

        const userRole = await User.findByIdAndUpdate(uid, { role: role}, { new: true});

        res.status(200).json({
            success: true,
            msg: 'Rol de Usuario Actualizado',
            user: userRole,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar rol del usuario',
            error: err.message
        });
    }
}

//Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        if (req.usuario.role === 'ADMIN_ROLE', 'CLIENT_ROLE') {
            const userToUpdate = await User.findById(uid);

            if (userToUpdate.role === 'ADMIN_ROLE') {
                return res.status(403).json({
                    success: false,
                    msg: 'No puedes modificar el rol de otro administrador.'
                });
            }
        }

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
}

//Actualizar foto del usuario
export const updateProfilePicture = async (req, res) => {
    try{
        const { uid } = req.params
        let newProfilePicture = req.file ? req.file.filename : null

        if(!newProfilePicture){
            return res.status(400).json({
                success: false,
                message: "No hay archivo en la petición"
            })
        }

        const user = await User.findById(uid)

        if(user.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicture)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Foto actualizada",
            profilePicture: user.profilePicture,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la foto",
            error: err.message
        })
    }
}

