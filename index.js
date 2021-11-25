require("dotenv").config();
const upload = require("./routes/upload");
const Grid = require("gridfs-stream");

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const authRoutes = require('./routes/authRouter')
const skils = require('./routes/skills')
const statuses = require('./routes/statuses')
const positions = require('./routes/positions')
const uploadRoutes = require('./routes/upload')
const keys = require('./config/keys')
const passport = require('passport')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

// for file upload
let gfs;
const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

app.use("/api/file", upload);

app.get("/file/:filename", async (req, res) => {
  try {
      const file = await gfs.files.findOne({ filename: req.params.filename });
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
  } catch (error) {
      res.send("not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
      await gfs.files.deleteOne({ filename: req.params.filename });
      res.send("foto is deleted");
  } catch (error) {
      console.log(error);
      res.send("An error occured.");
  }
});
////

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
app.use('/api', skils)
app.use('/api', statuses)
app.use('/api', positions)
app.use('/api', uploadRoutes)

async function start() {
  try {
    await mongoose.connect(
      keys.mongoHR_Tool3,
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
