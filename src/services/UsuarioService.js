import UsuarioRepository from "../repositories/UsuarioRepository.js";

const getAllUsuarios = async() => {
    return UsuarioRepository.getAllUsuarios();
}
const getUsuario = async(id) => {
    return UsuarioRepository.getUsuario(id);
}

const saveUsuario = async({login, password, post}) => {
    return UsuarioRepository.saveUsuario({login, password, post});
}
const updateUsuario = async(id,{login, password, post}) => {
    return UsuarioRepository.updateUsuario(id, {login, password, post});
}

const deleteUsuario = async(id) => {
    return UsuarioRepository.deleteUsuario(id);
}

const getUsuarioByLogin = async(login) => {
    return await UsuarioRepository.getUsuarioByLogin(login);
}

const UsuarioService = {
    getAllUsuarios,
    getUsuario,
    saveUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioByLogin
}
export default UsuarioService;