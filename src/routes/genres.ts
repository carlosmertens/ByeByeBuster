import { Router } from 'express';
import Joi from 'joi';
import { GenreModel } from '../db/genres';

interface IGenre {
  name: String;
  isActive: Boolean;
  date: Date;
}

const genreRouter = Router();

genreRouter
  .route('/')
  .get(async (req, res) => {
    const genres = await GenreModel.find().sort('name');
    res.send(genres);
  })
  .post(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    let genre = new GenreModel({ name: req.body.name });
    genre = await genre.save();

    res.status(201).send(genre);
  });

genreRouter
  .route('/:id')
  .get(async (req, res) => {
    const genre = await GenreModel.findById(req.params.id);
    if (!genre) return res.status(404).send('Genre not found!');

    res.send(genre);
  })
  .put(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await GenreModel.findByIdAndUpdate(
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
    const genre = await GenreModel.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('Genre not found!');

    res.send(genre);
  });

function validateGenre(genre: IGenre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
  });

  return schema.validate(genre);
}

export { IGenre, genreRouter };
