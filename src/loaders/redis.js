const redis = require('redis')

const redis1 = redis.createClient({
    url: 'redis://127.0.0.1:6379'
})
const redis2 = redis.createClient({
    url: 'redis://127.0.0.1:6380'
})
const redis3 = redis.createClient({
    url: 'redis://127.0.0.1:6381'
})
const startRedis = async () => {
    const response1 = await redis1.connect()
    const response2 = await redis2.connect()
    const response3 = await redis3.connect()
    console.log('Redis 1, 2 y 3 conectados');
}

module.exports = {
    redis1,
    redis2,
    redis3,
    startRedis
}