const expressLoader = require('./express')
const { startRedis } = require('./redis')

module.exports = async (app) => {
    const {expressApp} = app
    await expressLoader(expressApp)
    await startRedis()
}