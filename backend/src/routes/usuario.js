import { Usuario } from '../models/usuarioModel.js';
import { EquipeTecnica } from '../models/equipeTecnicaModel.js';
import { Administrador } from '../models/administradorModel.js';

export async function GetUsuarios (req, res) {
    try {
        const amostragens = await Usuario.findAll()
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}

export async function GetAdministradores (req, res) {
    try {
        const amostragens = await Administrador.findAll()
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}

export async function GetEquipesTecnicas (req, res) {
    try {
        const amostragens = await EquipeTecnica.findAll()
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}