const server = require('./http/server')
const database = require('./data/mongoConnection')
const memoryDB = require('./data/localMongoDB')
const configs = require('./shared/constants')
const logger = require('./shared/logger')

const setupApp = async (env) => {
    const localDAO = await memoryDB.getLocalMongoDAO(env)
    const URI = memoryDB.getURI(localDAO)
    logger.debug(`URI: ${URI}`)
    return URI ? URI: configs.MONGO_URI
}

// starts HTTP server
// connects mongoose to mongodb
const startApp = async (uri) => {
    try {		
        // NOTE: order is important to ensure correct connection is returned
        const promises = [
            server.connect(configs.PORT, configs.HOSTNAME),
            database.connect(uri),
        ];

        const connections = await Promise.all(promises)
        return connections[0];
    } catch (err){
        logger.error('Error in starting application!');
        logger.error(`${err}`);
        process.exit(1);
    }
};

// mongoose.connection.once('open', () => resolve(`Connection to database ${mongoose.connection.name} established!`))
//mongoose.connection.once('error', () => reject(`Error connecting to database ${mongoose.connection.name}...`))

const shutdownApp = async (httpServer, dao) => {

    try{
        logger.log("Shutting down application!")

        await Promise.all([
            server.disconnect(httpServer),
            database.disconnect(),
            memoryDB.stopInMemoryMongo(dao)
        ])

        process.exit(0)
    } catch(err){
        if(err){
            logger.error("Error in closing application gracefully!")
            logger.error(err)
            process.exit(1)
        } 
    }
}

const run = async () => {
    const URI = await setupApp(configs.ENV)
    const httpServer = await startApp(URI)
    process.on('SIGINT', async () => await shutdownApp(httpServer, configs.ENV))
}

run()
database.connectionStatus()
