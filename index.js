import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import genres from './routes/genres.js';
const app = express();

// MongoDB
mongoose
  .connect('mongodb://localhost:27017/playground')
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log(error));

const genreSchema = new mongoose.Schema({
  name: String,
  isActive: Boolean,
  date: { type: Date, default: Date.now },
});

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre() {
  const genre = new Genre({
    name: 'Horror',
    isActive: true,
  });
  const result = await genre.save();
  console.log(result);
}
// createGenre();

async function getGenres() {
  //
  const result = await Genre.find({ isActive: true })
    .sort({ name: -1 })
    .select({ name: 1, isActive: 1 });
  console.log(result);
}
getGenres();

// Middlewares
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/genres', genres);

// Port Listener
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`>> Server ready: port ${port}`));
