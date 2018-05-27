const conn = require('./conn');
const { User, Organization, Description, Type, UserOrganization } = require('./index').models;

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
    User.create({
      firstName: 'Anna',
      lastName: 'Zhang',
      email: 'annazhang@gmail.com',
      password: 'anna',
      userStatus: 'user'
    }),
    User.create({
      firstName: 'Gabriel',
      lastName: 'Rumbaut',
      email: 'gabrialrumbaut@gmail.com',
      password: 'gabrial',
      userStatus: 'user'
    }),
    User.create({
      firstName: 'Alexander',
      lastName: 'Levin',
      email: 'alexanderlevin@gmail.com',
      password: 'alexander',
      userStatus: 'user'
    }),
    Type.create({
      name: 'Fitness',
    }),
    Type.create({
      name: 'Education',
    }),
    Type.create({
      name: 'Restaurant',
    }),
    Organization.create({
      name: 'Cliffs LIC',
      address: '11-11 44th Drive',
      city: 'Queens',
      state: 'New York',
      zip: '11101',
      contact_name: 'Max',
      contact_phone: '718-729-7625',
      typeId:1
    }),
    Organization.create({
      name: 'Brooklyn Boulders',
      address: '575 Degraw St',
      city: 'Brooklyn',
      state: 'New York',
      zip: '11217',
      contact_name: 'Lucy',
      contact_phone: '347-834-9066',
      typeId:1
    }),
    Organization.create({
      name: 'Fullstack Academy',
      address: '5 Hanover Square',
      city: 'New York',
      state: 'New York',
      zip: '10004',
      contact_name: 'David',
      contact_phone: '123-456-7890',
      typeId:2
    }),
    Organization.create({
      name: 'New York University',
      address: '383 Lafayette Street',
      city: 'New York',
      state: 'New York',
      zip: '10003',
      contact_name: 'Andrew D. Hamilton',
      contact_phone: '123-456-7890',
      typeId:2
    }),
    Organization.create({
      name: 'Dos Caminos',
      address: '373 Park Ave S',
      city: 'New York',
      state: 'New York',
      zip: '10016',
      contact_name: 'Megan',
      contact_phone: '212-294-1000',
      typeId:3
    }),
  ])
  .then(([ master, admin, jeremy, anna, gabrial, alexander, fitness, education, restaurant,cliffs, bkb, fullstack, nyu, doscaminos ]) => {
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
      }),
      UserOrganization.create({
        userId: jeremy.id,
        organizationId: cliffs.id
      }),
      UserOrganization.create({
        userId: jeremy.id,
        organizationId: bkb.id
      }),
      UserOrganization.create({
        userId: jeremy.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: anna.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: anna.id,
        organizationId: nyu.id
      }),
      UserOrganization.create({
        userId: gabrial.id,
        organizationId: cliffs.id
      }),
      UserOrganization.create({
        userId: gabrial.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: alexander.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: alexander.id,
        organizationId: doscaminos.id
      }),
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
