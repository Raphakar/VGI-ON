const { MongoClient } = require('mongodb');

module.exports = ((connection) => {
    const client = new MongoClient(connection);
    return {
        async getPhotos() {
            await client.connect();
            const db = client.db('VGI-ON');
            return db.collection("Photos").find().toArray();
        },
        async insertPhoto(photo) {
            await client.connect();
            const db = client.db('VGI-ON');
            return db.collection("Photos").insertOne(photo)
        },
    }
})