const { MongoClient, ObjectId } = require('mongodb');

module.exports = ((connection) => {
    const client = new MongoClient(connection);
    return {
        async getFormTemplates() {
            await client.connect();
            const db = client.db('VGI-ON');
            return db.collection("FormTemplates").find().toArray();
        },
        async insertFormTemplate(formTemplate) {
            await client.connect();
            const db = client.db('VGI-ON');
            return db.collection("FormTemplates").insertOne(formTemplate)
        },
        async updateFormTemplate(formTemplate) {
            await client.connect();
            const db = client.db('VGI-ON');
            let newFormTemplate = { ...formTemplate }
            delete newFormTemplate.id
            let set = { $set: { ...newFormTemplate } }
            return db.collection("FormTemplates").updateOne({ _id: ObjectId(formTemplate.id) }, set)
        },
    }
})