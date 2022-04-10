const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(bodyParser.json());

 
app.use(cors());
app.options('*', cors())


//middleware
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routes
const projectsRoutes = require('./routes/projects');
const usersRoutes = require('./routes/users');

const api = process.env.API_URL;

app.use(`${api}/projects`, projectsRoutes);
app.use(`${api}/user`, usersRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ppms'
})
    .then(() => {
        console.log('Database Connection is ready...')
    })
    .catch((err) => {
        console.log(err);
    })

//Server

app.listen(process.env.PORT || 5000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
