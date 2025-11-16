import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usuarioSchema = new Schema ({

    login: {
        type: String,
        required: [true, 'Login is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    post: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);

const usuario = mongoose.model('Usuario', usuarioSchema);
export default usuario;