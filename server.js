/*jshint esversion: 6 */
const express = require('express');

const app = express();
const port = 80;

app.listen(port, () => console.log(`\nlistening on port: ${port}`));

app.use(express.static('public'));
