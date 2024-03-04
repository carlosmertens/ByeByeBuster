import { Request, Response } from 'express';
import { MovieModel, validateMovie } from '../models/Movie';
import { GenreModel } from '../models/Genre';
import { log } from '../logs';

async function getAllMovies(req: Request, res: Response) {
  try {
    const allMovies = await MovieModel.find().sort('title');
    res.send(allMovies);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function postNewMovie(req: Request, res: Response) {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = await GenreModel.findById(req.body.genreId);
  if (!genre) return res.status(400).send(error);

  try {
    let movie = new MovieModel({
      title: req.body.title,
      genre: { _id: genre._id, name: genre.name },
    });
    movie = await movie.save();
    res.status(201).send(movie);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function getMovieById(req: Request, res: Response) {
  try {
    const movie = await MovieModel.findById(req.params.id);
    res.send(movie);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Movie Not Found' });
  }
}

async function patchMovieById(req: Request, res: Response) {
  try {
    // 1. Retrieve requested id on db
    // 2 Modify any value changes
    // 3. Save modified genre
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Movie Not Found' });
  }
}

async function putMovieById(req: Request, res: Response) {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    const movie = await MovieModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(movie);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Movie Not Found' });
  }
}

async function deleteMovieById(req: Request, res: Response) {
  try {
    const movie = await MovieModel.findByIdAndDelete(req.params.id);
    res.send(movie);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Movie Not Found' });
  }
}

export const controller = {
  getAllMovies,
  postNewMovie,
  getMovieById,
  patchMovieById,
  putMovieById,
  deleteMovieById,
};
