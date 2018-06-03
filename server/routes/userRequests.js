const router = require('express').Router();
module.exports = router;

const { UserRequest } = require('../db').models;

router.get('/', (req, res, next) => {
  UserRequest.findAll()
    .then(userRequests => res.send(userRequests))
    .catch(next);
});

router.post('/', (req, res, next) => {
  UserRequest.create(req.body)
    .then(userRequest => res.send(userRequest))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  UserRequest.findById(req.params.id)
    .then(userRequest => {
      Object.assign(userRequest, req.body)
      return userRequest.save()
    })
    .then(userRequest => res.send(userRequest))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  UserRequest.findById(req.params.id)
    .then(userRequest => userRequest.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
})
