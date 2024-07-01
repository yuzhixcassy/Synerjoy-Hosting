import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const BiotaLaut = db.define('biotalaut', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false
    },
    food: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    depth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fun_fact: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default BiotaLaut;