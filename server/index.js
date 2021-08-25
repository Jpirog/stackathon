const { db, seedDB } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')

const init = async () => {

  try {
    if(process.env.SEED === 'true'){
      await seedDB();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  } catch (ex) {
    console.log(ex)
  }
}

init()