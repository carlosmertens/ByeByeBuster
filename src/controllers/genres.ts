import { RequestHandler } from 'express';
import { GenreModel, validateGenre } from '../models/Genre';

const getAllGenres: RequestHandler = async (req, res) => {
  try {
    const genres = await GenreModel.find().sort('name');
    res.send(genres);
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not connect with database!');
  }
};

const createNewGenre: RequestHandler = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    let genre = new GenreModel({ name: req.body.name });
    genre = await genre.save();
    res.status(201).send(genre);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

const getGenreById: RequestHandler = async (req, res) => {
  try {
    const genre = await GenreModel.findById(req.params.id);
    res.send(genre);
  } catch (err) {
    res.status(404).send('Genre not found!');
  }
};

const updateGenreById: RequestHandler = async (req, res) => {
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
};

const deleteGenreById: RequestHandler = async (req, res) => {
  try {
    const genre = await GenreModel.findByIdAndDelete(req.params.id);
    res.send(genre);
  } catch (err) {
    res.status(404).send('Genre not found!');
  }
};

export const controller = {
  getAllGenres,
  createNewGenre,
  getGenreById,
  updateGenreById,
  deleteGenreById,
};
