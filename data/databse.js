const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let database

const url = ''
const client = new MongoClient(url)

async function connectToDatabase() {
  await client.connect()
  database = client.db('online-')
}

function getDb() {
  if (!database) {
    throw new Error('You must connect to databse first')
  }

  return database
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
}
