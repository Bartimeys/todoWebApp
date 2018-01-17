const mongoose = require('mongoose');
/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

// Cosmos DB Connection String
// eslint-disable-next-line max-len
// const mongoUri = `mongodb://${process.env.COSMOSDB_ACCOUNT}:${process.env.COSMOSDB_KEY}@${
//   process.env.COSMOSDB_ACCOUNT
//   }.documents.azure.com:${process.env.COSMOSDB_PORT}/${process.env.COSMOSDB_DB}?ssl=true`;
const mongoUri = `mongodb://6d436285-0ee0-4-231-b9ee:xblXwyG9ICmx2p58kknKwBsc8P5ziiDoIvmA6QjAt3bDHZdO8PiiftFmvEnCcfihRY8vi77fokYa4WbHND65tw==@6d436285-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true`;
// &replicaSet=globaldb`;

// Local MongoDB Connection String
// const mongoUri = `mongodb://localhost:27017/connect-todos`;

function connect() {
  mongoose.set('debug', true);
  return mongoose.connect(mongoUri, { useMongoClient: true });
}

module.exports = {
  connect,
  mongoose
};
