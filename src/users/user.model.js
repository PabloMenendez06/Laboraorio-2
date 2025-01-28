import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true,"El nombre es requerido"]
    },
    correo: {
        type: String,
        required: [true, "El coreeo es requerido"]
    },
    password: {
        type: String,
        required: [true, "El contraseña es requerida"]
    },
    img: {
        type: String,
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        enum: ["ADMIN_ROL", "USER_ROL"],
    },
    estado: {
        type: String,
        default: false,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

UserSchema.methods.toJason = function(){
    const {__v, password, _id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario; 
}

export default mongoose.model("User", UserSchema);