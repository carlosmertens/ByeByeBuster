import { Request, Response } from 'express';

async function getAllMovies(req: Request, res: Response) {
  res.send('GET MOVIES REQUEST');
}

async function postNewMovie(req: Request, res: Response) {
  res.send('POST NEW MOVIE REQUEST');
}

async function getMovieById(req: Request, res: Response) {
  res.send('GET MOVIE BY ID');
}

async function patchMovieById(req: Request, res: Response) {
  res.send('PATCH MOVIE BY ID');
}

async function putMovieById(req: Request, res: Response) {
  res.send('PUT MOVIE BY ID');
}

async function deleteMovieById(req: Request, res: Response) {
  res.send('DELETE MOVIE BY ID');
}

export const controller = {
  getAllMovies,
  postNewMovie,
  getMovieById,
  patchMovieById,
  putMovieById,
  deleteMovieById,
};
