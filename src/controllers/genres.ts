import { RequestHandler, Request, Response } from 'express';
import { GenreModel, validateGenre } from '../models/Genre';
import { log } from '../logs';

const getAllGenres: RequestHandler = async (req, res) => {
  try {
    const genres = await GenreModel.find().sort('name');
    res.send(genres);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const postNewGenre: RequestHandler = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    log.error(error);
    return res.status(400).send(error.message);
  }

  try {
    let genre = new GenreModel({ name: req.body.name });
    genre = await genre.save();
    res.status(201).send(genre);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getGenreById: RequestHandler = async (req, res) => {
  try {
    const genre = await GenreModel.findById(req.params.id);
    res.send(genre);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Genre Not Found' });
  }
};

const patchGenreById: RequestHandler = (req, res) => {
  try {
    // 1. Retrieve requested id on db
    // 2 Modify any value changes
    // 3. Save modified genre
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Genre Not Found' });
  }
};

const putGenreById: RequestHandler = async (req, res) => {
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
    log.error(err);
    res.status(404).send({ message: 'Genre Not Found' });
  }
};

const deleteGenreById: RequestHandler = async (req, res) => {
  try {
    const genre = await GenreModel.findByIdAndDelete(req.params.id);
    res.send(genre);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Genre Not Found' });
  }
};

export const controller = {
  getAllGenres,
  postNewGenre,
  getGenreById,
  patchGenreById,
  putGenreById,
  deleteGenreById,
};
