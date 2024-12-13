const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGODB_KEY}@weatherappcluster.ovyyw.mongodb.net/?retryWrites=true&w=majority&appName=weatherAppCluster`;
// console.log(uri)

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const dbName = 'favoritesDb';
const collectionName = 'favoritesCollection';

function test() {
    console.log('test');
}

async function startDbConn(){
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect().then((_:any) => console.log('MongoDb server connected'));
        const database = client.db(dbName);
        return database.collection(collectionName);
    } catch (err) {
        console.error(`Something went wrong trying to connect: ${err}\n`);
    }
}

async function closeDbConn() {
    await client.close().then((_:any) => console.log('MongoDb connection closed'));
}

async function getFavorites() {
    const favArray = [];
    try {
        const database = client.db(dbName);
        const collection =  database.collection(collectionName);
        //console.log(collection);
        const cursor = await collection.find();
        for await (const record of cursor) {
            favArray.push(record);
        }
        return favArray;
    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
        throw err;
    }
}

async function deleteFavorite(id:any){
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        await collection.deleteOne({_id: new ObjectId(id)});
        //console.log(deleteRecord);
    } catch (err) {
        console.error(`Something went wrong trying to delete the document: ${err}\n`);
        throw err;
    }
}

module.exports = {
    startDbConn,
    closeDbConn,
    getFavorites,
    deleteFavorite
}
