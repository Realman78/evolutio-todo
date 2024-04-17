import { Sequelize } from "sequelize";
require('dotenv').config()

interface DbConfig {
    [key: string]: { storage: string; logging: boolean; };
}

const dbConfig: DbConfig = {
    dev: {
        storage: './database.sqlite',
        logging: true
    },
    test: {
        storage: './test-database.sqlite',
        logging: true
    },
    prod: {
        storage: './prod-database.sqlite',
        logging: false
    }
}

const env: string = process.env.NODE_ENV || 'dev'

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbConfig[env].storage,
    logging: dbConfig[env].logging,
});

export { sequelize }