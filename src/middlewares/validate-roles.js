export const hasRoles = (...roles) => {
    return(req, res, next) => {
        if(!req.usuario){
            return res.status(500).json({
                success: false,
                message: "Se requiere validar el role antes de validar el token"
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                success: false,
                message: `Usuario no autorizado, El recurso requiere uno de los siguientes roles: ${roles}`
            })
        }

        if (req.usuario.role === 'ADMIN' && req.params.id === req.usuario.id) {
            return res.status(403).json({
                success: false,
                message: "Un usuario ADMIN no puede modificar a otro ADMIN."
            });
        }

        if (req.usuario.role === 'CLIENT' && req.params.id === req.usuario.id) {
            return res.status(403).json({
                success: false,
                message: "Un usuario CLIENT no puede modificar a otro CLIENT."
            });
        }
        next()
    }
}