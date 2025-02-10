export const tieneRol = (...roles) => {
    
    return (req, res, next) => {
        if(!req.usuario){
            return res.status(500).json({
                success: false,
                msg: 'Se quiere verificar un role sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                success: false,
                msg: `Usuario no autorizado, posee un rol ${req.usuario.rol}, los roles autorizados son ${roles}`
            })
        }

        next();
    }
}