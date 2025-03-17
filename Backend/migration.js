const { MongoClient } = require("mongodb");

async function migrateData() {
    const oldUri = "mongodb+srv://surwaseonkar12345:0dUUdMkhtb8xpOm7@cluster0.76xae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true";
const newUri = "mongodb+srv://priyankads6546:priyank%406546@cluster0.ropnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true";

    const oldClient = new MongoClient(oldUri);
    const newClient = new MongoClient(newUri);
    
    try {
        await oldClient.connect();
        await newClient.connect();
        
        const oldDb = oldClient.db("old_database_name");
        const newDb = newClient.db("new_database_name");

        const collections = await oldDb.listCollections().toArray();

        for (let collection of collections) {
            const oldCollection = oldDb.collection(collection.name);
            const newCollection = newDb.collection(collection.name);
            
            const documents = await oldCollection.find().toArray();
            if (documents.length > 0) {
                await newCollection.insertMany(documents);
                console.log(`Migrated ${documents.length} documents from ${collection.name}`);
            }
        }

    } finally {
        await oldClient.close();
        await newClient.close();
    }
}

migrateData().catch(console.error);
