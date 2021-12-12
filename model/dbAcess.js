const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:admin@cluster0.py5xv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db('Projeto-3')

client.connect(async err => {
  await db.collection('users').insertOne({'login': 'fulano', 'senha': 112639, 'nome': 'Bruno'})
  client.close();
});
