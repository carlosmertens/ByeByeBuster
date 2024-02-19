import express from 'express';
import mongoose from 'mongoose';
import genres from './routes/genres.js';

const app = express();

// MongoDB

// Initialize Database
mongoose
  .connect('mongodb://localhost:27017/byeByeBuster')
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.error(error));

// Create Schema for a new Collection
const genreSchema = new mongoose.Schema({
  name: String,
  isActive: Boolean,
  date: { type: Date, default: Date.now },
});

const Genre = mongoose.model('Genre', genreSchema);

// Function to create a new membre of the Collection
async function createGenre() {
  const genre = new Genre({
    name: 'Thriller',
    isActive: true,
  });
  const result = await genre.save();
  console.log(result);
}
// createGenre();

// Function to show a Collection
async function getGenres() {
  return await Genre.find({ isActive: true })
    .sort({ name: -1 })
    .select({ name: 1, isActive: 1 });
}
getGenres().then(res => console.log(res));

async function updateGenre(id) {
  return await Genre.findByIdAndUpdate(
    id,
    {
      $set: {
        name: 'Documetary',
        isActive: false,
      },
    },
    { new: true }
  );
}
// updateGenre('65d34e70d7a5ddc17db58bb3');

async function deleteGenre(id) {
  return await Genre.findByIdAndDelete(id);
}

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/genres', genres);

// Port Listener
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`>> Server ready: port ${port}`));
