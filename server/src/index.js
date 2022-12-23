const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const QuestionRoute = require("./routes/Question.route");
const signupRoute = require("./routes/Signup.route");
const loginRoute = require("./routes/Login.route");


const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is quiz application")
})
app.use("/signup", signupRoute)
app.use("/login", loginRoute)
app.use("/question", QuestionRoute)

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB).then(() => {
  app.listen(PORT, () => {
    console.log("server is started on port " + PORT);
  });
});

