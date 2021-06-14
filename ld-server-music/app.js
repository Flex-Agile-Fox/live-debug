if(process.env.NODE_ENV !== 'production');

const express = require("express");
const app = express();
const cors = require('cors')
const port = 3001
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app run in port ${port}`);
})

if(process.env.NODE_ENV === 'test') module.exports = app;
