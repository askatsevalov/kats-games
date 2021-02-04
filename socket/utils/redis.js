const redis = require("redis");
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

console.log(process.env.REDIS_URL);

const client = redis.createClient(process.env.REDIS_URL || 'redis://localhost:6379');

client.on("error", function (error) {
    console.error(error);
});

module.exports.get = async key => await client.getAsync(key);

module.exports.set = async (key, value) => {
    await client.setAsync(key, value);
};

module.exports.expire = async (key, seconds) => {
    await client.expireAsync(key, seconds);
};
