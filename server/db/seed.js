const conn = require('./conn');
const { User, Organization, Description } = require('./index').models;

const seed = () => {
  return Promise.all([
    User.create({
      firstName: 'master',
      lastName: 'master',
      email: 'master@test.com',
      password: 'master',
      userStatus: 'master'
    }),
    User.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@test.com',
      password: 'admin',
      userStatus: 'admin'
    }),
    User.create({
      firstName: 'Jeremy',
      lastName: 'Grubard',
      email: 'jgrubard@gmail.com',
      password: 'jeremy',
      userStatus: 'user'
    }),
    Organization.create({
      name: 'Cliffs LIC',
      organization_type: 'Climbing Gym',
      address: '11-11 44th Drive',
      city: 'Queens',
      state: 'New York',
      zip: '11101',
      contact_phone: '718-729-7625'
    }),
    Organization.create({
      name: 'Brooklyn Boulders',
      organization_type: 'Climbing Gym',
      address: '575 Degraw Street',
      city: 'Brooklyn',
      state: 'New York',
      zip: '11217',
      contact_phone: '347-834-9066'
    }),
  ])
  .then(([ master, admin, jeremy, cliffs, bkb ]) => {
    return Promise.all([
      Description.create({
        attribute: 'Bouldering Level',
        description: 'V6',
        userId: jeremy.id,
        organizationId: cliffs.id
      }),
      Description.create({
        attribute: 'Top-Rope Level',
        description: '5.11',
        userId: jeremy.id,
        organizationId: cliffs.id
      })
    ])
  })
}

conn.sync({ force: true })
  .then(() => {
    console.log('seeding...')
    return seed();
  })
  .then(() => console.log('...database seeded...'))
  .then(() => {
    console.log('...connection closed')
    conn.close()
  })
  .catch(err => {
    console.log('uh-oh, there was an error seeding!')
    console.log(err)
  })
