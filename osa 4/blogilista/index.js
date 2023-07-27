const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')

const mongoose = require('mongoose')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
