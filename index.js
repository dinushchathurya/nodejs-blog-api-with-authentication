const express = require('express');
const app = express();

/* import required paramaters for database connection */
const config_app = require('./config/app.js');
const { databaseInitializer } = require('./libraries/database.js');

/* connect to database */
databaseInitializer(config_app.app.database_uri);

/* listen for requests */
app.listen(3000, ()=> {
    console.log('Application running on port 3000');
})

