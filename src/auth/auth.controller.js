import bryptjs from 'bcryptjs';

import Usuario from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res)=> {
    const {correo, passowrd} = req.body;

    try {
        const usuario = await Usuario.findOne ({correo});

        if (!usuario) {
            return res.status(400).json({
                msg: "credenciales incorrectas, correo no existe en la base de datos"
            });
        }
        if (!usuario) {
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos"
            });
        }

        const validarPassword = bryptjs.compareSync(password, usuario.passowrd);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "la contraseña es incorrecta"
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: "Login bueno",
            usuario,
            token
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: "comuniquese con el administrador"
        });
    }

}

export const register = async (req, res) => {
    const {nombre, correo, password, rol, phone} = req.body;
    const user = new Usuario ({nombre, correo, password, rol, phone});

    const salt = bryptjs.genSaltSync();
    user.password = bryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user,
    });
}