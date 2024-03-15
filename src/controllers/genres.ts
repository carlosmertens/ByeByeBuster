import { RequestHandler } from 'express';
import { GenreModel, validateGenre } from '../models/Genre';
import { log } from '../logs';

const getAllGenres: RequestHandler = async (req, res, next) => {
  const genres = await GenreModel.find().sort('name');

  res.send(genres);
};

const postNewGenre: RequestHandler = async (req, res, next) => {
  const { error } = validateGenre(req.body);
  if (error) {
    log.error(error);
    return res.status(400).send(error.message);
  }

  let genre = new GenreModel({ name: req.body.name });
  genre = await genre.save();

  res.status(201).send(genre);
};

const getGenreById: RequestHandler = async (req, res) => {
  const genre = await GenreModel.findById(req.params.id);
  res.send(genre);
};

const patchGenreById: RequestHandler = (req, res) => {
  // TODO:
  // 1. Retrieve requested id on db
  // 2 Modify any value changes
  // 3. Save modified genre
};

const putGenreById: RequestHandler = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = await GenreModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  res.send(genre);
};

const deleteGenreById: RequestHandler = async (req, res) => {
  const genre = await GenreModel.findByIdAndDelete(req.params.id);
  res.send(genre);
};

export const controller = {
  getAllGenres,
  postNewGenre,
  getGenreById,
  patchGenreById,
  putGenreById,
  deleteGenreById,
};
