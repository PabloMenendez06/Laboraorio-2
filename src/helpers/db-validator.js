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

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`)
    }
}

export const existeUsuarioById = async(id = ' ') =>{
    const existeUsuario = await User.findById(id);

    if(!existeUsuario){
        throw new Error(`El ID ${id} no existe`);
        
    }
}
export const existePetById = async (id = '') => {
    const existePet = await Pet.findById(id);

    if (!existePet){
        throw new Error(`La mascota ${id} no existe`)
    }
}

export const existeCitaById = async (id = '') => {
    const existeCita = await Appoinment.findById(id);
    if(!existeCita){
        throw new Error(`El ID ${id} no existe en la base de datos`);
    }
}