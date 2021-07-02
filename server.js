require('dotenv').config();

const express = require ('express');
const routes = require('./routes/tea'); // import the routes

// add this line below the other import statements
const helmet = require('helmet');

// add this line below the helmet import statement
const compression = require('compression');

const app = express();

// add this line below const app = express();
app.use(helmet());

// add this below app.use(helmet())
app.use(compression()); //Compress all routes

 //import mongoose
 const mongoose = require('mongoose');

app.use(express.json());



//establish connection to database
mongoose.connect(
    process.env.MONGODB_URI,
    {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
      replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    },
    function (err) {
      if (err) return console.log("Error: ", err);
      console.log(
        "MongoDB Connection -- Ready state is:",
        mongoose.connection.readyState
      );
    }
  );
  


app.use('/', routes); //to use the routes
app.use('/uploads', express.static('./uploads'));

// add this below app.use("/", routes) to make index.html a static file
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})

