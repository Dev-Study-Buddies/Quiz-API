module.exports = async function globalTeardown(){
    const instance = global.__MONGOD__
    await instance.stop()
}