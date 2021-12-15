const { MongoClient } = require('mongodb');

module.exports = ((connection) => {
    const client = new MongoClient(connection);
    return {
        async getTags() {
            await client.connect();
            const db = client.db('VGI-ON');
            return db.collection("Tags").find().toArray();
        },
        async insertTags(listTags) {
            if (listTags.length === 0)
                return [];
            await client.connect();
            const db = client.db('VGI-ON');
            return new Promise(async (resolve) => {
                return await db.collection("Tags").insertMany(listTags, { ordered: false }, (err, result) => {
                    if (result) {
                        console.log(result.insertedIds)
                        resolve(result.insertedIds);
                    } else {
                        let ids = err.result.result.insertedIds.map(e => e._id);
                        resolve(ids);
                    }
                })
            })

        },
    }
})