var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a = require('mongodb'), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion, ObjectId = _a.ObjectId;
var uri = "mongodb+srv://borhade:T9uLwunB3u8qZoi1@weatherappcluster.ovyyw.mongodb.net/?retryWrites=true&w=majority&appName=weatherAppCluster";
var client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
var dbName = 'favoritesDb';
var collectionName = 'favoritesCollection';
function test() {
    console.log('test');
}
function startDbConn() {
    return __awaiter(this, void 0, void 0, function () {
        var database, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // Connect the client to the server	(optional starting in v4.7)
                    return [4 /*yield*/, client.connect().then(function (_) { return console.log('MongoDb server connected'); })];
                case 1:
                    // Connect the client to the server	(optional starting in v4.7)
                    _a.sent();
                    database = client.db(dbName);
                    return [2 /*return*/, database.collection(collectionName)];
                case 2:
                    err_1 = _a.sent();
                    console.error("Something went wrong trying to connect: ".concat(err_1, "\n"));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function closeDbConn() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.close().then(function (_) { return console.log('MongoDb connection closed'); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getFavorites() {
    return __awaiter(this, void 0, void 0, function () {
        var favArray, database, collection, cursor, _a, cursor_1, cursor_1_1, record, e_1_1, err_2;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    favArray = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 15, , 16]);
                    database = client.db(dbName);
                    collection = database.collection(collectionName);
                    return [4 /*yield*/, collection.find()];
                case 2:
                    cursor = _e.sent();
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 8, 9, 14]);
                    _a = true, cursor_1 = __asyncValues(cursor);
                    _e.label = 4;
                case 4: return [4 /*yield*/, cursor_1.next()];
                case 5:
                    if (!(cursor_1_1 = _e.sent(), _b = cursor_1_1.done, !_b)) return [3 /*break*/, 7];
                    _d = cursor_1_1.value;
                    _a = false;
                    record = _d;
                    favArray.push(record);
                    _e.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(!_a && !_b && (_c = cursor_1.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _c.call(cursor_1)];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/, favArray];
                case 15:
                    err_2 = _e.sent();
                    console.error("Something went wrong trying to find the documents: ".concat(err_2, "\n"));
                    throw err_2;
                case 16: return [2 /*return*/];
            }
        });
    });
}
function deleteFavorite(id) {
    return __awaiter(this, void 0, void 0, function () {
        var database, collection, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    database = client.db(dbName);
                    collection = database.collection(collectionName);
                    return [4 /*yield*/, collection.deleteOne({ _id: new ObjectId(id) })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.error("Something went wrong trying to delete the document: ".concat(err_3, "\n"));
                    throw err_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    startDbConn: startDbConn,
    closeDbConn: closeDbConn,
    getFavorites: getFavorites,
    deleteFavorite: deleteFavorite
};
