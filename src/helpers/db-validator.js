import Rol from "../rol/rol.model.js";
import User from "../users/user.model.js";

export const esRolValido = async(rol = ' ')=>{
    const existeRol = await Rol.findOne({rol});

    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la base de datos`)
    }
}

export const existeEmail = async (correo = ' ') =>{
    const existeEmail = await User.findOne({correo});

    if (!existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`)
    }
}