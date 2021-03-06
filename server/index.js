import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import { app } from './server.js';
import { addJobInfoToPerson } from './utilities/utilities.js';

const __dirname = path.resolve();
const PORT = 8080;

const RANDOM_USER_URL = 'https://randomuser.me/api/';
const NUM_RESULTS = 50;

let seed = undefined;

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/users/:page', (req, res) => {
  const url = `${RANDOM_USER_URL}?page=${req.params.page}&results=${NUM_RESULTS}${seed ? `&seed=${seed}` : ''}`
  axios.get(url)
    .then((response) => {
      const { data } = response;
      const { info, results } = data;
      seed = info.seed;
      const updatedResults = results.map(addJobInfoToPerson);
      const updatedData = { ...data, results: updatedResults };
      res.send(updatedData);
    })
    .catch((err) => console.log('Error:', err));
});

app.listen(PORT);
