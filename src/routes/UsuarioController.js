import  express  from "express";
import UsuarioService from "../services/UsuarioService.js";
import bcrypt from "bcrypt";

let router = express.Router();


router.get('/usuarios', async(req, res) => {
    try {
        const usuarios = await UsuarioService.getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
        
    }
})

router.get('/getUsuario/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const usuario = await UsuarioService.getUsuario(id);
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
        
    }
});

router.post('/postUsuario', async(req, res) => {
    const {login, password, post} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await UsuarioService.saveUsuario({login, password: hashedPassword, post});
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put('/usuarios/:id', async(req, res) => {
    const {id} = req.params;
    const {login, password, post} = req.body;
    try {
        const usuario = await UsuarioService.updateUsuario(id, {login, password, post});
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/usuarios/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const usuario = await UsuarioService.deleteUsuario(id);
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
})


export default router;