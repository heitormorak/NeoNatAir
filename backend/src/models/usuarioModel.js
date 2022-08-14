import { Sequelize } from "sequelize";
import { conexao } from "./db.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Usuario = conexao.define('usuario', {
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    senha: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    telefone: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    profissao: {
        type: Sequelize.FLOAT,
        allowNull: true,
    }
});

//Cria tabela
Usuario.sync();

//Força alteração na tabela
//Usuario.sync({alter: true})
