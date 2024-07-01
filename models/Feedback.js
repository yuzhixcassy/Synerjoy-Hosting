import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Feedback = db.define('feedback', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    freezeTableName: true
});

export default Feedback;

(async () => {
    await db.sync();
})();