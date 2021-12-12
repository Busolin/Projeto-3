let http = require('http'), 
    path = require('path'),
    express = require('express'),
    app = express();

    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'view'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.urlencoded({extended: false}));

    app.get('/', (req, res) => {
        res.render('index')
    });

app.listen(3000)
/* EX MONGODB
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Projeto-3', 
        async (err,conn) => {
    if(err) throw err;
    
    const db = conn.db();

    await db.collection('teste').insertOne({
        nome: 'Bruno', idade: 20});
    conn.close();
});
*/