const express = require('express');

const app = express();

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const port = 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.listen(port, () => console.log(`run : ${port}`))


// module.exports = app;
