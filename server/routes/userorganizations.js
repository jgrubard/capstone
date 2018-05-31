const router = require('express').Router();
module.exports = router;

const { UserOrganization } = require('../db').models;

router.get('/', (req, res, next) => {
  UserOrganization.findAll()
    .then(userOrganizations => res.send(userOrganizations))
    .catch(next);
});

router.post('/', (req, res, next) => {
  UserOrganization.create(req.body)
    .then(userOrganization => res.send(userOrganization))
    .catch(next);
});

// router.put('/:id', (req, res, next) => {
//   UserOrganization.findById(req.params.id)
//     .then(userOrganization => {
//       Object.assign(userOrganization, req.body);
//       return userOrganization.save();
//     })
//     .then(userOrganization => res.send(userOrganization))
//     .catch(next);
// });

router.delete('/:id', (req, res, next) => {
  UserOrganization.findById(req.params.id)
    .then(userOrganization => userOrganization.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

// router.delete('/:id', (req, res, next) => {
//   User.findById(req.params.id)
//     .then(user => user.destroy())
//     .then(() => res.sendStatus(204))
//     .catch(next);
// });
