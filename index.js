const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const authRoutes = require('./routes/authRouter')
const keys = require('./config/keys')
const passport = require('passport')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// for parse body
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', todoRoutes)
app.use('/api', authRoutes)

async function start() {
  try {
    await mongoose.connect(
      keys.mongoTudo,
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
