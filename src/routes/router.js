import  express  from "express";
import usuarioController from "./UsuarioController.js";
import bcrypt from "bcrypt";
import usuarioService from "../services/UsuarioService.js";
import verifyToken from "../middleware/authMiddleware.js";
import jwt from 'jsonwebtoken';


let router = express.Router();

router.get("/", function(req, res){
    console.log("hi1!");
    res.status(200).json({message: "Hello world"});
}
);

router.post("/login", async (req, res) => {
    try {
        const {login, password} = req.body;
        const usuario = await usuarioService.getUsuarioByLogin(login);
        if(!usuario) {
            return res.status(401).json({error: 'Authentication Failed!'});
        }
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if(!passwordMatch) {
            return res.status(401).json({error: 'Authentication Failed!'});
        }
        const token = jwt.sign({usuarioId: usuario._id}, 'you-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Login failed!'});
    }
})

router.use("/", verifyToken, usuarioController);

export default router;