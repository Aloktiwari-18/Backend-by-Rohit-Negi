const redis=require('redis')

const redisClient=redis.createClient({
    username: 'default',
    password: '1tTj3GRwmlaUUxgn1tidiftBA3k7zxfW',
    socket: {
        host: 'redis-11890.crce206.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 11890
    }
});




module.exports=redisClient;