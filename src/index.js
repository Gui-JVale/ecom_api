import { start } from './server'

start()
process.on('SIGINT', () => {
  console.log('Bye bye!')
  process.exit()
})
