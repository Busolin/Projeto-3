const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:admin@cluster0.py5xv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db('Projeto-3')


module.exports.public = function (array) {
    client.connect(async err => {
        await db.collection('public').insertOne(array)
        client.close();
    });
}
module.exports.login = function (user) {
    client.connect(err => {
        db.collection('public').findOne(user).toArray();    
    });
    client.close()
}