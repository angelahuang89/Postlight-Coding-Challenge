import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const app = express();

const __dirname = path.resolve();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);
