const { application } = require('express');
const { User } = require('./controller/user');
var dbAcess = require('./model/dbAcess');

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
//dbAcess.register()
dbAcess.login('fulano', 112639)
