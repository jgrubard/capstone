const conn = require('./conn');
const { User, Organization, Description, UserOrganization, Form, OrganizationRequest, UserRequest } = require('./index').models;

const seed = () => {
  return Promise.all([
    User.create({
      firstName: 'Master',
      lastName: 'Master',
      email: 'master@test.com',
      password: 'master',
      userStatus: 'master'
    }),
    User.create({
      firstName: 'Admin',
      lastName: 'Admin',
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
      email: 'gabrielrumbaut@gmail.com',
      password: 'gabriel',
      userStatus: 'user'
    }),
    User.create({
      firstName: 'Alexander',
      lastName: 'Levin',
      email: 'alexanderlevin@gmail.com',
      password: 'alexander',
      userStatus: 'user'
    }),
    Organization.create({
      name: 'Cliffs LIC',
      organization_type: 'Climbing Gym',
      address: '11-11 44th Drive',
      city: 'Queens',
      state: 'New York',
      zip: '11101',
      contact_name: 'Mary',
      contact_phone: '718-729-7625',
      backgroundColor: '#c5cae9',
      textColor: '#000000',
      latitude: 40.705076,
      longitude: -74.009160
    }),
    Organization.create({
      name: 'REACTO',
      organization_type: 'Education',
      address: '575 Degraw St',
      city: 'Brooklyn',
      state: 'New York',
      zip: '11217',
      contact_name: 'Lucy',
      contact_phone: '347-834-9066',
      backgroundColor: '#33691e',
      textColor: '#fff',
      latitude: 40.704418,
      longitude: -74.017902
    }),
    Organization.create({
      name: 'Fullstack Academy',
      organization_type: 'Education',
      address: '5 Hanover Square',
      city: 'New York',
      state: 'New York',
      zip: '10004',
      contact_name: 'David',
      contact_phone: '123-456-7890',
      latitude: 40.705726,
      longitude: -74.017750
    }),
    Organization.create({
      name: 'Tiger Boxing',
      organization_type: 'Boxing Gym',
      address: '383 Lafayette Street',
      city: 'New York',
      state: 'New York',
      zip: '10003',
      contact_name: 'Andrew D. Hamilton',
      contact_phone: '123-456-7890',
      latitude: 40.704362,
      longitude: -74.010046
    }),
    Organization.create({
      name: 'Acme',
      organization_type: 'Bar',
      address: '373 Park Ave S',
      city: 'New York',
      state: 'New York',
      zip: '10016',
      contact_name: 'Mat',
      contact_phone: '212-294-1000',
      latitude: 40.706877,
      longitude: -74.011265
    })
  ])
  .then(([ master, admin, jeremy, anna, gabriel, alexander, cliffs, reacto, fullstack, tiger, acme]) => {
    return Promise.all([
      Form.create({
        name: 'Bouldering Skill Level',
        organizationId: cliffs.id
      }),
      Form.create({
        name: 'Top-Rope Skill Level',
        organizationId: cliffs.id
      }),
      Form.create({
        name: 'Years Experience',
        organizationId: fullstack.id
      }),
      Form.create({
        name: 'Developer Level',
        organizationId: fullstack.id
      }),
      Description.create({
        description: 'I am a junior',
        userId: anna.id,
        organizationId: fullstack.id,
      }),
      Description.create({
        description: 'I am a senior',
        userId: alexander.id,
        organizationId: fullstack.id,
      }),
      UserOrganization.create({
        userId: admin.id,
        organizationId: cliffs.id
      }),
      UserOrganization.create({
        userId: jeremy.id,
        organizationId: reacto.id
      }),
      OrganizationRequest.create({
        userId: jeremy.id,
        organizationId: reacto.id,
        status: 'accepted'
      }),
      UserOrganization.create({
        userId: jeremy.id,
        organizationId: fullstack.id
      }),
      OrganizationRequest.create({
        userId: jeremy.id,
        organizationId: fullstack.id,
        status: 'accepted'
      }),
      UserOrganization.create({
        userId: anna.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: anna.id,
        organizationId: tiger.id
      }),
      UserOrganization.create({
        userId: gabriel.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: alexander.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: alexander.id,
        organizationId: acme.id
      }),
      admin.setOrganization(cliffs),
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
