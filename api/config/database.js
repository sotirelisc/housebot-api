// If locally, import vars from env.js
// env.js is git ignored
if (!process.env.PASSPORT_KEY || !process.env.MONGO_DB) {
  require('./env.js')
}

module.exports = {
  'secret': process.env.PASSPORT_KEY,
  'database': process.env.MONGO_DB
}
