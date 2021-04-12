const { MongoClient } = require('mongodb');

function startServer() {
    const url = process.env.MONGODB_CONNECTION;
    const client = new MongoClient(url)
    const db = client.db('VGI_ON');
    
}