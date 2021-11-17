//importing
import express from "express"; //ES6 notation
import mongoose from "mongoose"; //ES6 notation

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware

//DB config
const connection_URL =
  "mongodb+srv://admin:admin@cluster0.timlc.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

//listening
app.listen(port, () => console.log(`Listening on localhost:${port}`));
