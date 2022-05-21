import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import api from './api'

const port = process.env.PORT || 3000;

const app: Express = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api', api)

app.get('/ping', (req: Request, res: Response) => {
  res.send(`Pong! ${new Date().toISOString()}`);
});

app.listen(port, () => {
  console.log(`Running fs0821 server api on port ${port}`);
});
