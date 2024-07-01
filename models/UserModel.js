import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'admin'
    }
}, {
    freezeTableName: true
});

export default User;

(async () => {
    await db.sync();
})();