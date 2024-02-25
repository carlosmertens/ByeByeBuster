import { Router } from 'express';
import Joi from 'joi';
import { GenreModel } from '../db/genres';

interface IGenre {
  name: String;
  isActive: Boolean;
  date: Date;
}

const genreRouter = Router();

genreRouter.get('/', async (req, res) => {
  try {
    const genres = await GenreModel.find().sort('name');
    res.send(genres);
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not connect with database!');
  }
});

genreRouter.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    let genre = new GenreModel({ name: req.body.name });
    genre = await genre.save();
    res.status(201).send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

genreRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const genre = await GenreModel.findById(req.params.id);
      res.send(genre);
    } catch (err) {
      res.status(404).send('Genre not found!');
    }
  })
  .put(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    try {
      const genre = await GenreModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        { new: true }
      );
      res.send(genre);
    } catch (err) {
      res.status(404).send('Genre not found!');
    }
  })
  .delete(async (req, res) => {
    try {
      const genre = await GenreModel.findByIdAndDelete(req.params.id);
      res.send(genre);
    } catch (err) {
      res.status(404).send('Genre not found!');
    }
  });

function validateGenre(genre: IGenre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
  });

  return schema.validate(genre);
}

export { IGenre, genreRouter };
