const mongoose = require('mongoose');
const logger = require('../logger');
mongoose.Promise = global.Promise;

async function connectToDatabase() {
    try {
        const user = process.env.DB_USER;
        const password = process.env.DB_PASS;
        const host = process.env.DB_HOST
        const port = process.env.DB_PORT;
        const dbName = process.env.DB_NAME
        const rs = process.env.DB_REPLICA_SET;

        const connectionString = `mongodb://${user}:${password}@${host}:${port}/${dbName}?replicaSet=${rs}`;
        logger.info('Connected to database:     '+connectionString);
        await mongoose.connect(connectionString, {
            maxPoolSize: 50, // maxPoolSize
            wtimeoutMS: 2500,
        });
        logger.info('Connected to database:     '+connectionString);
    } catch (e) {
        logger / console.error(e);
        
    }
}

module.exports = connectToDatabase;