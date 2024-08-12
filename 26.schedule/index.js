import { scheduleJob } from "node-schedule";

const job = scheduleJob('*/10 * * * * *', () => {
    console.log(new Date().toISOString(), 'The answer to life, the universe, and everything!')
})
