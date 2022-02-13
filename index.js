const express = require('express');
const { config } = require('./config/config');
const routerApi = require('./routes');
const { boomErrorHandler } = require('./middleware/errorHandler');
const passport = require('passport');


const app = express();
const port = config.port;

require('./utils/');

app.use(express.json());

app.use(passport.initialize());

routerApi(app);

app.use(boomErrorHandler);

app.listen(port, () => {
    console.log("Running in port", port);
});