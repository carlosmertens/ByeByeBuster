import express, { urlencoded } from 'express';
import genres from './routes/genres.js';
const app = express();

app.use(urlencoded({ extended: true }));

app.use('/api/genres', genres);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`>> Server ready: port ${port}`));
