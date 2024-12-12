"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://borhade:T9uLwunB3u8qZoi1@weatherappcluster.ovyyw.mongodb.net/?retryWrites=true&w=majority&appName=weatherAppCluster";
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
function startDbConn() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            yield client.connect().then((_) => console.log('MongoDb server connected'));
            const database = client.db(dbName);
            return database.collection(collectionName);
        }
        catch (err) {
            console.error(`Something went wrong trying to connect: ${err}\n`);
        }
    });
}
function closeDbConn() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.close().then((_) => console.log('MongoDb connection closed'));
    });
}
function getFavorites() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const favArray = [];
        try {
            const database = client.db(dbName);
            const collection = database.collection(collectionName);
            //console.log(collection);
            const cursor = yield collection.find();
            try {
                for (var _d = true, cursor_1 = __asyncValues(cursor), cursor_1_1; cursor_1_1 = yield cursor_1.next(), _a = cursor_1_1.done, !_a; _d = true) {
                    _c = cursor_1_1.value;
                    _d = false;
                    const record = _c;
                    favArray.push(record);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = cursor_1.return)) yield _b.call(cursor_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return favArray;
        }
        catch (err) {
            console.error(`Something went wrong trying to find the documents: ${err}\n`);
            throw err;
        }
    });
}
function deleteFavorite(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const database = client.db(dbName);
            const collection = database.collection(collectionName);
            yield collection.deleteOne({ _id: new ObjectId(id) });
            //console.log(deleteRecord);
        }
        catch (err) {
            console.error(`Something went wrong trying to delete the document: ${err}\n`);
            throw err;
        }
    });
}
module.exports = {
    startDbConn,
    closeDbConn,
    getFavorites,
    deleteFavorite
};
