import Usuario from "../models/Usuario.js";

const getAllUsuarios = async () => {
    try {
        return await Usuario.find();
    } catch (error) {
        throw new Error(error);
    }
}

const getUsuario = async ( id ) => {
    try {
        return await Usuario.findById(id);
    } catch (error) {
        throw new Error(error);
        
    }
}

const saveUsuario = async ({login, password, post}) => {
    try {
        const usuario = new Usuario({login, password, post});
        return await usuario.save();
    } catch (error) {
        throw new Error(error);
    }
}

const updateUsuario = async (id, {login, password, post}) => {

    try {
        return await Usuario.findByIdAndUpdate(id, {login, password, post}, {new: true})
    } catch (error) {
        throw new Error(error);
    }
}

const deleteUsuario = async ( id ) => {
    try {
        return await Usuario.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

const getUsuarioByLogin = async (login) => {
    try {
        return await Usuario.findOne({"login": login});
    } catch (error) {
        throw new Error(error);
    }
}

const UsuarioRepository = {
    getAllUsuarios,
    getUsuario,
    saveUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioByLogin

}
export default UsuarioRepository;