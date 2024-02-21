import { Router } from 'express';
import Joi from 'joi';
import mongoose from 'mongoose';

const router = Router();

// Create Schema for a new Collection
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 25 },
  isActive: Boolean,
  date: { type: Date, default: Date.now },
});

const Genre = mongoose.model('Genre', genreSchema);

router
  .route('/')
  .get(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  })
  .post(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Genre not found!');

    res.send(genre);
  })
  .put(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (!genre) return res.status(404).send('Genre not found!');

    res.send(genre);
  })
  .delete(async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('Genre not found!');

    res.send(genre);
  });

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

export default router;
