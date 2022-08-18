import { Usuario } from '../models/usuarioModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GetUsers (req, res) {
    try {
        const users = await Usuario.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users)
    } catch (error) {
        console.error(error)
    }
}


export async function Register (req,res) {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error){
        console.log(error);
    }
}

export async function Login (req, res) {
    try{
        const user = await Usuario.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match){
            return res.status(400).json({
                msg: "Usuario ou senha incorreta"
            });
        }
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });        
    }catch (error){
        res.status(404).json({msg:"Usuario não encontrado"});
    }
}


export async function Logout (req,res) {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Usuario.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Usuario.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}