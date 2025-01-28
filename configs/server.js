'use strict';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConection } from '../configs/mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth.routes.js'

const configurarMiddlewares = (app) =>{
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const configurarRutas = (app) =>{
    const authPath = '/adoptionSystem/v1/auth'

    app.use(authPath, authRoutes);
}

const conectarDB = async () =>{
    try {
        await dbConection();
        console.log("conexion a la base de datos exitosa")
    } catch (error) {
        console.error('Error conectando a la base de datos',error);
        process.exit(1)
    }
}

export const iniciarServidor =  async () =>{
    const app = express();
    const port = process.env.PORT || 8001;

    await conectarDB();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    })
}