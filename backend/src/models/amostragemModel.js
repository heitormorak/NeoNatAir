import { Sequelize } from "sequelize";
import { conexao } from "./db.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Amostragem = conexao.define('amostragen', {
    idAmbiente: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    data: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    temperatura: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    co2: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    tvoc: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    umidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    luminosidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    ruido: {
        type: Sequelize.FLOAT,
        allowNull: false,
    }
});

//Cria tabela
Amostragem.sync();

//Força alteração na tabela
//Amostragem.sync({alter: true})
