import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existeEmail, esRolValido } from "../helpers/db-validator.js";

const router = Router();

router.post(
    '/login',
    [
        check('correo', 'Este no es un correo valido').isEmail(),
        check('password', 'el passord es obligatorio').not().notEmpty(),
        validarCampos,
    ],
    login
);

router.post(
    '/register',
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({min: 6}),
        check('correo', 'este no es un correo valido').isEmail(),
        check('correo').custom(existeEmail),
        check('rol').custom(esRolValido),
        check('phone','El telefono debe contener 8 numeros').isLength({min: 8, max: 8})
    ],
    register
)

export default router;