'use strict'

const {seedDB, db, User, Alert } = require('../server/db')

async function runSeed() {
  console.log('seeding starting...')
  try {
    await seedDB()
  } catch (err) {
    console.log('seeding aborting...')
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('seeding complete...')
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
//module.exports = seed
