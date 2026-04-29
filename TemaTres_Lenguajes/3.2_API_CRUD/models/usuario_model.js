import mongoose from "mongoose";
import { type } from "node:os";

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type : String,
            required : [true, 'Favor de ingresar el nombre']
        },

        edad: {
            type : Number,
            required : [true, 'Favor de ingresar su edad']
        },

        email: {
            type : String,
            required : [true, 'Favor de ingresar su email'],
            unique: true,
        }

    },
    {
        timestamps: true
    },
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;

