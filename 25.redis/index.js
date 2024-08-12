import { Redis } from "ioredis";

const redis=new Redis()
await redis.set('name','hwz')
await redis.set('age',30)

const name = await redis.get('name')
const age = await redis.get('age')

await redis.hset('person',{
    name:'he55',
    age:18
})
const person = await redis.hgetall('person')
console.log(person)
