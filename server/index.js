const express = require('express');
const app = express();
const { conn } = require('./db');
const path = require('path');

app.use(require('body-parser').json());

app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

conn.sync()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`I'm listening on port ${port}.`));
  });
