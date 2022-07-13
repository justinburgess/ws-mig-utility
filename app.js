const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const pug = require('pug');
const app = express();

const mongoUrl = 'mongodb://localhost:27017/ws-migration';
const store = new MongoStore({mongoUrl});

mongoose.connect(mongoUrl);
const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'Connection error: '));

// track user sessions
app.use(session({
    secret: 'pao3$X9fuTz@oDkC2^',
    resave: true,
    saveUninitialized: false,
    store
})
);

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

// include routes
const routes = require('./routes');
// const indexRoutes = require('./routes/index');
const mainRoutes = require('./routes/main');
const dashboardRoutes = require('./routes/workspot/dashboard');
const workspotConnections = require('./routes/workspot/connection');



app.use(routes);
app.use('/main', mainRoutes);
app.use('/workspot/dashboard', dashboardRoutes);
app.use('/workspot/connection', workspotConnections);


// listen on port 3000
app.listen(3000, () => {
    console.log('Express app listening on port 3000');
});