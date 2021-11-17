//importing
import express from "express"; //ES6 notation
import mongoose from "mongoose"; //ES6 notation
import Messages from "./dbMessages.js";
import Pusher from "pusher";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1298959",
  key: "85677974eea15293d8c9",
  secret: "dd8143c207543f2b1c08",
  cluster: "ap2",
  useTLS: true,
});

//middleware
app.use(express.json());

//DB config
const connection_URL =
  "mongodb+srv://admin:admin@cluster0.timlc.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_URL, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
  });
});

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listening
app.listen(port, () => console.log(`Listening on localhost:${port}`));
