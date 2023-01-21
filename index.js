const express = require("express");
const path = require("path");
const bodyparser = require("body-parser")
const mongoose = require('mongoose');

const DB = "mongodb+srv://sp68:Sachin68@cluster0.krvu6dd.mongodb.net/iEducate?retryWrites=true&w=majority";

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected with DB");
}).catch((err) => console.log("Not Connected", err));



// mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true })
const app = express();
const port = 80;

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  text: String
});
const Contact = mongoose.model('User', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
  const params = {}
  res.status(200).render('index.pug', params);
})

app.post('/', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.send("This item has been saved to the database")
  }).catch(() => {
    res.status(404).send("Item was not saved to the database")
  });

  // res.status(200).render('home.pug');
})


// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});