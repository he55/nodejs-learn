import { scheduleJob } from "node-schedule"
import log4js from 'log4js'

log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'app.log' }
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'debug' }
    }
})

const logger = log4js.getLogger()
const job = scheduleJob('*/10 * * * * *', () => {
    logger.info('The answer to life, the universe, and everything!')
})
