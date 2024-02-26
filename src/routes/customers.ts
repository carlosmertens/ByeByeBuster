import { Router } from 'express';

export const customersRouter = Router();

customersRouter.get('/', (req, res) => {
  res.send('Get Request ALL');
});

customersRouter.post('/', (req, res) => {
  res.send('POST request');
});

customersRouter.get('/:id', (req, res) => {
  res.send('GET request with ID');
});

customersRouter.put('/:id', (req, res) => {
  res.send('PUT request');
});

customersRouter.delete('/:id', (req, res) => {
  res.send('DELETE request');
});
