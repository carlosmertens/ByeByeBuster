import { Router } from 'express';
import Joi from 'joi';

const router = Router();

// genres
const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Horror' },
];

router
  .route('/')
  .get((request, response) => {
    response.send(genres);
  })
  .post((request, response) => {
    const { error } = validateGenre(request.body);
    if (error) return response.status(400).send(error.message);

    const genre = { id: genres.length + 1, name: request.body.name };
    genres.push(genre);
    response.send(genre);
  });

router
  .route('/:id')
  .get((request, response) => {
    const genre = genres.find(genre => genre.id === Number(request.params.id));
    if (!genre) return response.status(404).send('Genre not found!');

    response.send(genre);
  })
  .put((request, response) => {
    const { error } = validateGenre(request.body);
    if (error) return response.status(400).send(error.message);

    const genre = genres.find(genre => genre.id === Number(request.params.id));
    if (!genre) return response.status(404).send('Genre not found!');

    genre.name = request.body.name;
    response.send(genre);
  })
  .delete((request, response) => {
    const genre = genres.find(genre => genre.id === Number(request.params.id));
    if (!genre) return response.status(404).send('Genre not found!');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    response.send(genre);
  });

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

export default router;
