import {Sequelize} from "sequelize";

const db = new Sequelize('massive_db','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;