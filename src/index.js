'use strict';

const { server, client, URI } = require('./config');
const { mongoose } = require('./database');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3001);
//midlewars
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: client}));
app.use(session({
    secret: 'creatibook2021', //Esto es secreto. Encripta la información que le pasemos en el string
    resave: true, //Guarda los datos por cada sesion, no importa si no hubieron cambios
    saveUninitialized: true, // Guarda la sesion en la llamada inicial, ignorando si la session está vacía
    store: MongoStore.create({ //Especificamos el store, donde se van a guardar nuestras sessiones. En este caso utilizamos el modulo connect-mongo, que nos crea una conexión con la base de datos y además una collection con el nombre sessions
        mongoUrl: URI,
        autoReconnect: true
    })
}));
app.use(cookieParser('creatibook2021'));
app.use(passport.initialize());
app.use(passport.session());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/user', require(path.join(__dirname, 'routers', 'user.route')));
app.use('/publication', require(path.join(__dirname, 'routers', 'publication.route')));

//server initial
app.listen(app.get('port'), ()=>{console.log('server listening on port 3001')})
/*app.listen(3001, ()=>{
    console.log('\x1b[36m%s\x1b[0m',`server listening on port ${server}`);
});*/