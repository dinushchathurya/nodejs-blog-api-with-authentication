const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/* import required paramaters for database connection */
const config_app = require('./config/app.js');
const { databaseInitializer } = require('./libraries/database.js');

const { auth_route } = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

/* connect to database */
databaseInitializer(config_app.app.database_uri);

app.use('/api/v1/auth', auth_route);

/* listen for requests */
app.listen(3000, ()=> {
    console.log('Application running on port 3000');
})

