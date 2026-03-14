const { MongoClient } = require('mongodb');
const url = 'mongodb://172.23.10.39:12012';

// ── Connection Pool ───────────────────────────────────────────────────────────
const client = new MongoClient(url, { maxPoolSize: 10 });
let isConnected = false;

async function getClient() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}

const sapClients = new Map();
async function getSapClient(urls) {
  if (!sapClients.has(urls)) {
    const c = new MongoClient(urls, { maxPoolSize: 5 });
    await c.connect();
    sapClients.set(urls, c);
  }
  return sapClients.get(urls);
}
// ─────────────────────────────────────────────────────────────────────────────

exports.insertMany = async (db_input, collection_input, input) => {
  const c = await getClient();
  return await c.db(db_input).collection(collection_input).insertMany(input);
};

exports.find = async (db_input, collection_input, input) => {
  const c = await getClient();
  return await c.db(db_input).collection(collection_input).find(input).limit(1000).sort({ "_id": -1 }).toArray();
};

exports.findsome = async (db_input, collection_input, input) => {
  const c = await getClient();
  return await c.db(db_input).collection(collection_input).find(input).limit(500).sort({ "_id": -1 }).project({ "PO": 1, "CP": 1, "ALL_DONE": 1 }).toArray();
};

exports.findallC = async (db_input) => {
  const c = await getClient();
  const db = c.db(db_input);
  const collectionInfos = await db.listCollections().toArray();
  const entries = await Promise.all(
    collectionInfos.map(async (coll) => {
      const docs = await db.collection(coll.name).find({}).toArray();
      return [coll.name, docs];
    })
  );
  return Object.fromEntries(entries);
};

exports.update = async (db_input, collection_input, input1, input2) => {
  const c = await getClient();
  return await c.db(db_input).collection(collection_input).updateOne(input1, input2);
};

exports.findSAP = async (urls, db_input, collection_input, input) => {
  const c = await getSapClient(urls);
  return await c.db(db_input).collection(collection_input).find(input).limit(1000).sort({ "_id": -1 }).toArray();
};
