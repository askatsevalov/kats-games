const redis = require("redis");
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const client = redis.createClient({
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || 'localhost',
    // password: process.env.REDIS_PASSWORD || 'null',
});

client.on("error", function (error) {
    console.error(error);
});

module.exports.get = async key => await client.getAsync(key);

module.exports.set = async (key, value) => {
    await client.setAsync(key, value);
};
