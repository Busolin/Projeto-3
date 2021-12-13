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
/*
module.exports.find = function (email, key) {
        client.connect(err => {
         db.collection('public').find({ 'email': 'bruno@bsds.com' }).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            resposta = result
            //console.log(resposta)
            client.close();
            return resposta
        });    
    });

}*/