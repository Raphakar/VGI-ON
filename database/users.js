const { MongoClient } = require('mongodb');

module.exports = ((connection) => {
    const client = new MongoClient(connection);
    return {
        async getUsers() {
            await client.connect();
            const db = client.db('VGI-ON');
            return db.collection("Users").find().toArray();
        },
    }
})