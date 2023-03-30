const redis = require('redis')
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
})

client.on('connect', function () {
    console.log('Redis连接成功')
})

client.on('error', function (err) {
    console.log('Redis连接失败：' + err)
})

module.exports = client
