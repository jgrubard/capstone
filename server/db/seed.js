const conn = require('./conn')
const { User, Organization } = require('./index').models;

const seed = () => {
  return Promise.all([
    User.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@test.com',
      userStatus: 'admin'
    }),
    Organization.create({
      name: 'Cliffs LIC',
      organization_type: 'Climbing Gym',
      address: '11-11 44th Drive',
      city: 'Queens',
      state: 'New York',
      zip: '11101',
      contact_phone: '718-729-7625'
    })
  ])
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
    console.log('uh oh, there was an error seeding!')
    console.log(err)
  })
