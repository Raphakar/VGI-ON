const { MongoClient } = require('mongodb');

module.exports = ((connection) => {
    const client = new MongoClient(connection);
    return {
        async getCategories() {
            await client.connect();
            const db = client.db('VGI-ON');
            return db.collection("Categories").find().toArray();
        },
    }
})