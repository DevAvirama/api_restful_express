require('dotenv').config();

const comun = {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
};

module.exports = {
    development: comun,
    test: comun,
    production: comun
};